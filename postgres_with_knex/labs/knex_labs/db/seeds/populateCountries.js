/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const countriesData = require('../../countriesData');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('countries').insert(countriesData.map(({ countryName, countryCode }) => ({ name: countryName, code: countryCode })));
    });
};
