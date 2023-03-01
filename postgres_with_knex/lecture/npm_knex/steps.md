* Initialize the node project
```
npm init -y
```

* Install pg and knex in local project
```
npm i pg knex
```
* also install it for global cli 'npm install -g knex' or, you can run it with 'npx' from local project

* Create db named knex_demo
```
createdb -e knex_demo
```

* Initialize knex
```
knex init
```
* Configure knex 
```
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
    }
  },
};

```
* Create a migration file to create Post table
```
knex migrate:make CreatePosts
```
