const faker = require('faker');

// Get a random country
const randomCountry = faker.address.country();
console.log(randomCountry);

// Get a company name
const companyName = faker.company.companyName();
console.log(companyName);

// Get a date in the past
const pastDate = faker.date.past();
console.log(pastDate);

// Get a date between January 1st 2020 and December 31st 2020
const date2020 = faker.date.between('2020-01-01', '2020-12-31');
console.log(date2020);