const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}
function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(reservationId) {
  return knex("reservations").where({ reservation_id: reservationId }).del();
}

function list(reservation_date) {
  return knex("reservations")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
  list,
};
