const add = require('./add');
const primes = require('./primes');

console.log(primes.reduce(add, 0));