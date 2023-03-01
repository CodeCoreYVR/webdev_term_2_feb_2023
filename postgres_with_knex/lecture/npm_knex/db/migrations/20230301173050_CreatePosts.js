/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//
// CREATE TABLE posts (
//     id BIGSERIAL,
//     title  VARCHAR(200),
//     content TEXT,
//     createdAt timestamp
// )
//

exports.up = function (knex) {
    // return knex.schema.createTable("posts", (createTableBuilder) => {
    //     createTableBuilder.bigIncrements("id"); // id: bigserial
    //     createTableBuilder.string("title", 200); // title: varchar(200)
    //     createTableBuilder.text("content"); //content: text
    //     createTableBuilder.timestamp("createdAt"); // createdAt: timestamp
    // })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// It is run when we do migrate:rollback
exports.down = function (knex) {
    // return knex.schema.dropTable("posts");
};
