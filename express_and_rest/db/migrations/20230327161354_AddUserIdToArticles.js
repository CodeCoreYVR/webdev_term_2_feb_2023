/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("posts", table => {
    table.integer("user_id")
        .references("users.id")
        .onDelete("CASCADE") // if user is removed, all its posts are removed, another option is set null
        .onUpdate("CASCADE") // if user id is changed, all its post's user id are changed, another option is set null
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("posts", table => {
    table.dropColumn("user_id");
  })
};
