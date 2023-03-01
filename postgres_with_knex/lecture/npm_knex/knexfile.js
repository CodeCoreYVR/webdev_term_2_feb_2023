// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'knex_demo',
      // user:     'username',
      // password: 'password'
    },
    
    //Migration is set of queries the defines the structure of our database over time (DDL like creating table, dropping table or, altering table)
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },

    seeds: {
      directory: './db/seeds'
    }
  },
};
