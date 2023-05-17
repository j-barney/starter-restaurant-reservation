const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

function finish(table_id) {
  return knex("tables")
    .update({ reservation_id: null }, "*")
    .where({ table_id })
    .then((table) => table[0]);
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  read,
  update,
  delete: finish,
  list,
};
