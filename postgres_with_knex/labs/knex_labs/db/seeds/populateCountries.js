/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const countriesData = require('../../countriesData');

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('countries').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('countries').insert(countriesData.map(({ countryName, countryCode }) => ({ name: countryName, code: countryCode })));
//     });
// };
// the above commented out code doesn't ignore duplicate entries. If we only do as the lab asks then errors will be thrown when trying to "$ knex migrate:latest" as there were already duplicate names in the database.

// Import the countriesData from the file

exports.seed = function(knex) {
  // Deletes ALL existing entries from the countries table
  return knex('countries').del()
    .then(function () {
      // Create an object to hold unique countries based on country name
      const uniqueCountries = {};

      // Loop through the countriesData array
      countriesData.forEach(({ countryName, countryCode }) => {
        // If the current country name is not in the uniqueCountries object
        if (!uniqueCountries[countryName]) {
          // Add the current country to the uniqueCountries object
          uniqueCountries[countryName] = { name: countryName, code: countryCode };
        }
      });

      // Convert the values of the uniqueCountries object to an array
      const countryEntries = Object.values(uniqueCountries);

      // Insert the unique country entries into the countries table
      return knex('countries').insert(countryEntries);
    });
};