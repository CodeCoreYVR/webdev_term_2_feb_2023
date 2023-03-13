
const knex = require('../db/client');

// Practice:
// Within your Knex_labs root directory, create a directory called queries and with in that create a file called practice.js.
// Build all 10 queries within this file.
Promise.all([
  // 1. Retrieve all countries from the countries table.
  knex('countries')
    .then(countries => {console.log('Query 1: ', countries)})
    .catch(err => {console.error(err.message)}),

  // 2. Retrieve the name and code of all countries from the countries table.
  knex.select('name', 'code')
    .from('countries')
    .then(countries => {console.log('Query 2: ', countries)})
    .catch(err => {console.error(err.message)}),

  // 3. Retrieve the name and code of all countries in alphabetical order from the countries table.
  knex.select('name', 'code')
    .from('countries')
    .orderBy('name')
    .then(countries => {console.log('Query 3: ', countries)})
    .catch(err => {console.error(err.message)}),

  // 4. Retrieve the country with the highest id from the countries table.
  knex('countries')
    .orderBy('id', 'DESC')
    .limit(1)
    .then(country => {console.log('Query 4: ', country)})
    .catch(err => {console.error(err.message)}),

  // 5. Retrieve the year and quantity for all populations from the populations table.
  knex.select('year', 'quantity')
    .from('populations')
    .then(populations => {console.log('Query 5: ', populations)})
    .catch(err => {console.error(err.message)}),

  // 6. Retrieve the year and quantity for all populations in descending order of quantity from the populations table.
  knex.select('year', 'quantity')
    .from('populations')
    .orderBy('quantity', 'DESC')
    .then(populations => {console.log('Query 6: ', populations)})
    .catch(err => {console.error(err.message)}),

  // 7. Retrieve the total quantity of population for a specific country, given its country_id, from the populations table.
  knex.select(knex.sum('quantity').as('total_population'))
    .from('populations')
    .where('country_id', '=', 1)
    .then(result => {console.log('Query 7: ', result[0].total_population)})
    .catch(err => {console.error(err.message)}),

  // 8. Retrieve the name, code, and total quantity of population for a specific country, given its country_id, by joining the countries and populations tables.
  knex.select('countries.name', 'countries.code', knex.sum('populations.quantity').as('total_population'))
    .from('countries')
    .join('populations', 'countries.id', '=', 'populations.country_id')
    .where('countries.id', '=', 1)
    .groupBy('countries.name', 'countries.code')
    .then(result => (console.log('Query 8: ', result)))
    .catch(err => {console.error(err.message)}),

  // 9. Retrieve the name and code of all countries with a population greater than 100,000 from the countries and populations tables.
  knex.select('countries.name', 'countries.code')
    .from('countries')
    .join('populations', 'countries.id', '=', 'populations.country_id')
    .where('populations.quantity', '>', 100000)
    .then(result => {console.log('Query 9: ', result)})
    .catch(err => {console.error(err.message)}),

  // 10. Retrieve the average quantity of population for all years and countries from the populations table.
  knex.select(knex.avg('quantity').as('avg_population'))
    .from('populations')
    .then(result => {console.log('Query 10: ', result)})
    .catch(err => {console.error(err.message)})

])
.then(() => {
  // Close the database connection
  knex.destroy();
})
.catch(error => {
  console.error(error.message);
  // Close the database connection on error
  knex.destroy();
});