// $ knex migrate:make create_populations_table
// $ knex migrate:latest

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('populations', table => {
    table.bigIncrements('id');
    table.integer('year');
    table.bigInteger('quantity');
    table.integer('country_id');
    table.foreign('country_id').references('countries.id');
    // foreign key can only be declared on an existing column. 
    // line 10 is declaring it, line 11 is assigning the foreign key to it.
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
  return knex.schema.dropTable('populations');  
};
