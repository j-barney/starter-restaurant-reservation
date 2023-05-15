const service = require("./tables.service");
const asyncErrorBoundary = require("../../utils/asyncErrorBoundary");
const resService = require("../reservations/reservations.service");

function bodyDataHas(propertyName) {
    return function (req, res, next) {
      if (req.body.data[propertyName]) {
        return next();
      }
      next({ status: 400, message: `Must include a ${propertyName}` });
    };
  }

  function dataExists(req, res, next) {
    const data = req.body.data;
    if (data) {
      next();
    } else {
      return next({
        status: 400,
        message: "Request must include data",
      });
    }
  }

async function tableExists(req, res, next) {
  const table = await service.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table cannot be found.` });
}

function capacityValidator(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (Number.isInteger(capacity)) {
    next();
  } else {
    return next({
      status: 400,
      message: `capacity must be a number`,
    });
  }
}

function tableNameValidator(req, res, next) {
  const { data: { table_name } = {} } = req.body;
  const tableName = String(table_name);
  if (tableName.length < 2) {
    return next({
      status: 400,
      message: `table_name must be more than one character`,
    });
  } else {
    return next();
  }
}

function capacityPeopleValidator(req, res, next) {
    if (res.locals.table.capacity >= res.locals.reservation.people) {
        return next()
    } else {
        return next({
            status: 400,
            message: `Table ${res.locals.table.table_id} capacity not large enough for reservation ${res.locals.reservation_id}`,
          });
    }
}

function tableIsAvailable(req, res, next) {
    if (res.locals.table.reservation_id !== null) {
        return next({
            status: 400,
            message: `Table ${res.locals.table.table_id} is occupied.`,
          });    
        } else {
        return next();
    }
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data });
}

async function update(req, res, next) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const data = await service.update(updatedTable);
  res.json({ data });
}

async function reservationExists(req, res, next) {
  const reservation_id = req.body.data.reservation_id;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "Request must include a reservation_id.",
    });
  }
  const reservation = await resService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

module.exports = {
  update: [
    asyncErrorBoundary(dataExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(capacityPeopleValidator),
    asyncErrorBoundary(tableIsAvailable),
    asyncErrorBoundary(update),
  ],
  create: [
    asyncErrorBoundary(dataExists),
    asyncErrorBoundary(capacityValidator),
    asyncErrorBoundary(tableNameValidator),
    asyncErrorBoundary(bodyDataHas("table_name")),
    asyncErrorBoundary(bodyDataHas("capacity")),
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
