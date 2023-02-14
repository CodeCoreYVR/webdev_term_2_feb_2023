// This function adds two numbers or defaults the second to 0 if no second argument is provided
function add(a, b = 0) {
  return new Promise((resolve, reject) => {
    // Check if both a and b are numbers, reject with an error message if not
    if (typeof a !== 'number' || typeof b !== 'number') {
      let val = typeof a !== 'number' ? a : b;
      // If either 'a' or 'b' is not a number, we construct an error message string and pass it as an argument to the 'reject' method of the promise.
      reject(new Error(`"${val}" is not a valid number!`));
    } else {
      // If a and b are both numbers, resolve with their sum
      setTimeout(() => {
        // 'return new Promise()' creates a promise object, which represents an asynchronous operation that may 
        // or may not complete successfully in the future.

        // The use of setTimeout inside the Promise callbacks simulates the asynchronicity of the operation. 
        // setTimeout is a function in JavaScript that allows you to schedule a function to run after a certain 
        // amount of time has passed, giving the illusion of asynchronicity.

        // So in this case, return new Promise() creates a promise object that represents an asynchronous operation, 
        // and setTimeout is used to simulate the delay between the start of the operation and its completion, 
        // giving the illusion of asynchronicity.
        resolve(a + b);
      });
    }
  });
}

// This function multiplies two numbers or defaults the second to 0 if no second argument is provided
function mult(a, b = 0) {
  return new Promise((resolve, reject) => {
    // Check if both a and b are numbers, reject with an error message if not
    if (typeof a !== 'number' || typeof b !== 'number') {
      let val = typeof a !== 'number' ? a : b;
      // If either 'a' or 'b' is not a number, we construct an error message string and pass it as an argument to the 'reject' method of the promise.
      reject(new Error(`"${val}" is not a valid number!`));
    } else {
      // If a and b are both numbers, resolve with their product
      setTimeout(() => {
        resolve(a * b);
      });
    }
  });
}

// This function divides two numbers or defaults the second to 0 if no second argument is provided
function div(a, b = 0) {
  return new Promise((resolve, reject) => {
    // Check if both a and b are numbers, reject with an error message if not
    if (typeof a !== 'number' || typeof b !== 'number') {
      let val = typeof a !== 'number' ? a : b;
      // If either 'a' or 'b' is not a number, we construct an error message string and pass it as an argument to the 'reject' method of the promise.
      reject(new Error(`"${val}" is not a valid number!`));
    // If the second argument is 0, reject with a "Cannot divide by zero" error message
    } else if (b === 0) {
      reject(new Error('Cannot divide by zero'));
    } else {
      // If a and b are both numbers and b is not 0, resolve with their quotient
      setTimeout(() => {
        resolve(a / b);
      });
    }
  });
}

// This function subtracts two numbers or defaults the second to 0 if no second argument is provided
function sub(a, b = 0) {
  return new Promise((resolve, reject) => {
    // Check if both a and b are numbers, reject with an error message if not
    if (typeof a !== 'number' || typeof b !== 'number') {
      let val = typeof a !== 'number' ? a : b;
      // If either 'a' or 'b' is not a number, we construct an error message string and pass it as an argument to the 'reject' method of the promise.
      reject(new Error(`"${val}" is not a valid number!`));
    } else {
      // If a and b are both numbers, resolve with their difference
      setTimeout(() => {
        resolve(a - b);
      });
    }
  });
}

// This function raises a number to a power or defaults the second to 0 if no second argument is provided
function pow(a, b = 1) {
  return new Promise((resolve, reject) => {
    // Check if both a and b are numbers, reject with an error message if not
    if (typeof a !== 'number' || typeof b !== 'number') {
      let val = typeof a !== 'number' ? a : b;
      // If either 'a' or 'b' is not a number, we construct an error message string and pass it as an argument to the 'reject' method of the promise.
      reject(new Error(`"${val}" is not a valid number!`));
    } else {
      // If both arguments are numbers, we resolve the promise with the result of a to the power of b.
      setTimeout(() => {
        resolve(Math.pow(a, b));
      });
    }
  });
}

//  ---------------------- testing ----------------------

add(9) // value is 0 // Returns ~> 9
  .then(value => add(9, value)) // value is 9 // Returns ~> 18
  .then(value => add(2, value)) // value is 18 // Returns ~> 20
  .then(value => mult(5, value)) // value is 20 // Returns ~> 100
  .then(value => div(value, 10)) // value is 100 // Returns ~> 10
  .then(console.log); // logs 10

pow(2) // r is 1 // Returns ~> 2
  .then(r => pow(2, r)) // r is 2 // Returns ~> 4
  .then(r => pow(2, r)) // r is 4 // Returns ~> 16
  .then(r => mult("fitty-two", r)) // r is 16, but the mult('fitty-two', ...)
  // should reject
  .then(console.log) // never makes it here
  .catch(console.log); // error logs 'fitty-two is not a valid number'



// [Lab] Contrived Math Functions

// Create a collection of "async" math functions that return promises. Any function
// can be made asynchronous by using setTimeout without a time argument.

// Create the following functions:

//     add: Sums two numbers together.
//     mult: Multiplies two arguments together.
//     div: Divides the first argument by the last.
//     sub: Subtracts the last argument from the first.
//     pow: Raises the first to the power of the second.

// Each function should return a Promise where its promise value is the result of the calculation.
// Because each function returns a promise, they should be a usable in a chain of then calls as follows:

// add(9)
//   .then(value => add(9, value))// value is 9
//   .then(value => add(2, value))// value is 18
//   .then(value => mult(5, value)) // value is 20
//   .then(value => div(value, 10)) // r is 100
//   .then(console.log); // logs 10

// All functions should reject if any arguments are not numbers.

// pow(2)
//   .then(r => pow(2, r)) // r is 2
//   .then(r => pow(2, r)) // r is 4
//   .then(r => mult("fitty-two", r)) // r is 16, but the mult('fitty-two', ...)
//   // should reject
//   .then(console.log) // never makes it here
//   .catch(console.log); // error logs 'fitty-two is not a valid number'
