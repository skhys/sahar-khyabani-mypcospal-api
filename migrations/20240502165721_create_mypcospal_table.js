const knex = require("knex")(require("../knexfile"));
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("entries", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.string("mood").notNullable();
    table.string("symptoms").notNullable();
    table.string("activities").notNullable().defaultTo("Didn't Exercise");
    table.string("notes").Nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("entries");
};
