// $ knex migrate:make create_countries_table
// $ knex migrate:latest

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('countries', table => {
      table.bigIncrements('id');
      table.string('name');
      table.string('code');
      table.timestamps(true,true);
  })
};

// increments id range is -2,147,483,648 to 2,147,483,647.
// bigIncrements id range is -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('countries');
};
