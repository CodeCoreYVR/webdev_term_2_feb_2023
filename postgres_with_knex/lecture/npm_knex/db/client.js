
const knex = require("knex");
const knexConfig = require("../knexfile");

const knexClient = knex(knexConfig.development);

module.exports = knexClient;