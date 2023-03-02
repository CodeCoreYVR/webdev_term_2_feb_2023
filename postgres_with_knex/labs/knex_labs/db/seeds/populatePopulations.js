/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const countriesData = require('../../countriesData');

// exports.seed = function(knex) {
//   return knex('populations').del()
//     .then(() => {
//       const populationEntries = countriesData.map(({, countryName, countryYear, countryValue }) => {
//         const country = knex('countries')
//           .where(name === countryName)
//           .limit(1)
//         return ({ year: countryYear, value: countryValue, country_id: country.id })
//       })
//       populationEntries = Object.values(populationEntries);
//       return knex('populations').insert(populationEntries);
//     });
// };

// -----------------------------------------------------------------------
exports.seed = function(knex) {
  // Deletes ALL existing entries from the populations table
  return knex('populations').del()
    .then(function () {
      // Get countries.id for all countries in the countries table
      return knex.select('id', 'name').from('countries');
    })
    .then(function (countries) {
      // Create an object mapping country names to their ids
      const countryIdsByName = {};
      countries.forEach(country => {
        countryIdsByName[country.name] = country.id;
      });

      // Insert populations data with country ids
      const populationsWithIds = {};
      countriesData.forEach(({countryName, year, value}) => {
        const country_id = countryIdsByName[countryName];

        // Only add the population entry if one doesn't already exist for this country_id or if this entry has a later year
        if(!populationsWithIds[country_id] || populationsWithIds[country_id].year < year) {
          populationsWithIds[country_id] = {
            year: year,
            quantity: value,
            country_id: country_id
          }
        }
      });

      // Convert the object of populations data to an array
      const populationEntry = Object.values(populationsWithIds);

      // Reverse the array so that the most recent entries are inserted last, making them easier to find when viewing the populations table. This is not neccessary, it's strictly for ease of understanding. 
      // if you prefer the most recent entries to be inserted first, comment out this line and run the seed command again
      populationEntry.reverse();

      // Insert the populations data into the populations table
      return knex('populations').insert(populationEntry);
    });
};


