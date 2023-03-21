// set the environment
const environment = process.env.NODE_ENV || "development"
// load exported configs from knexfile.js
const config = require("../knexfile")
// grab the environment that we want to connect
const environmentConfig = config[environment]
// require knex
const knex = require("knex")
// pass the environment you want to connect to knex
const connection = knex(environmentConfig)

// add finally: export the connectionclea
module.exports = connection;