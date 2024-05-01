const knex = require("knex")(require("./knexfile"));

exports.up = function(knex) {
  return knex.schema.createTable("entries", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.string("mood").notNullable();
    table.string("symptoms").notNullable();
    table.string("activities").notNullable();
    table.string("notes").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("entries"); // do i delete the down part since I'm not deleting?
};
