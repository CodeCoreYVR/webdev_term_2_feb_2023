// const knex = require('knex');
// const config = require('../knexfile').development;

// const db = knex(config);
// The above code isn't neccessary due to the client.js file

// const knex = require('../db/client');
// const db = knex; 
// Lines 7 & 8 are same as line 10:
const db = require('../db/client');

Promise.all([
  // Find all countries whose names begin with "b" ignoring case.
  db('countries')
    .whereRaw('LOWER(name) LIKE ?', 'b%')
    .orderBy('name')
    .then(rows => console.log('Query 1: ', rows))
    .catch(error => console.error(error.message)),

  // Count how many countries have "central" in their name.
  db('countries')
    .count()
    .whereRaw('LOWER(name) LIKE ?', '%central%')
    .then(count => console.log(`Query 2: There are "${count[0].count}" countries with "central" in their name.`))
    .catch(error => console.error(error.message)),

  // Find all countries whose names begin with the same three letters as their code ignoring case.
  db('countries')
    .whereRaw('LOWER(name) LIKE LOWER(code || \'%\')')
    .orderBy('name')
    .then(rows => console.log('Query 3: ', rows))
    .catch(error => console.error(error.message))
])
.then(() => {
  // Close the database connection
  db.destroy();
})
.catch(error => {
  console.error(error.message);
  // Close the database connection on error
  db.destroy();
});
  

