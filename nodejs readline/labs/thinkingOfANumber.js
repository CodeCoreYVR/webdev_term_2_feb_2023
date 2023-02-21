// Import the readline module
const readline = require('readline');

// Create a readline interface using the standard input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define a function to ask for the range of numbers to guess between
function askForRange() {
  // Ask the user for the minimum number
  rl.question('Enter the minimum number: ', (minNumber) => {
    // Ask the user for the maximum number
    rl.question('Enter the maximum number: ', (maxNumber) => {
      // Check if the user entered valid numbers
      if (isNaN(minNumber) || isNaN(maxNumber)) {
        // If not, print an error message and ask again
        console.log(`Invalid Input: ${minNumber} and ${maxNumber} must be numbers. Please try again.`)
        askForRange()
      } else if (minNumber >= maxNumber - 1) {
        // Check if the user entered a valid range
        console.log(`Invalid input: maximum number(${maxNumber}) must be 2 or more higher than minimum number(${minNumber}). Please try again.`);
        // If not, print an error message and ask again
        askForRange();
      } else {
        // Generate a random number between the min and max
        const secretNumber = Math.floor(Math.random() * (maxNumber - minNumber - 1)) + 1 + parseInt(minNumber);
        // Initialize the number of attempts to 0
        let attempts = 0;
        console.log(`secretNumber: ${secretNumber}`)
        // Print the range of numbers to guess between
        console.log(`I'm thinking of a number between ${minNumber} and ${maxNumber}`);

        // Define a function to ask for the user's guess
        function askForGuess() {
          // Ask the user for their guess
          rl.question('> ', (guess) => {
            // Increment the number of attempts
            attempts++;
            // Check if the guess is a valid number
            if (isNaN(parseInt(guess))) {
              // If not, print an error message and ask again
              console.log(`Invalid input: "${guess}" is not a number. Please try again.`);
              askForGuess();
            } else if (parseInt(guess) === secretNumber) {
              // Check if the guess is correct
              console.log(`Guessed "${secretNumber}" correctly in ${attempts} attempt${attempts === 1 ? '' : 's'}!`);
              // If so, print a success message and close the readline interface
              rl.close();
            } else {
              // If the guess is incorrect, determine if the secret number is higher or lower
              let range;
              // range = secretNumber > guess ? ', higher' : ', lower'; // try uncommenting this line to see what happens.
              // Print a message telling the user to try again and whether the secret number is higher or lower
              console.log(`Nope${range ? range : ''}! Try again.`)
              // Ask for the user's guess again
              askForGuess();
            }
          });
        }

        // Call the askForGuess function to start the guessing game
        askForGuess();
      }
    });
  });
}

// Call the askForRange function to start the program
askForRange();



// [Lab] Thinking of a Number

// Create a script, thinkingOf.js, that plays the "I'm thinking of a number between X and Y" game with the user. When the user runs the script, it should tell them that it's thinking of a number between a number and another, then the user types a number to attempt a guess. The user should have as many attempts as they need. When they guess it correctly, the script should indicate that the user won and it should also log how many attempts it took.

// Here's a sample interaction with the script:
  
//   $ node thinkingOf.js
//   I'm thinking of a number between 1 and 10
//   > 6
//   Nope. Try again.
//   > 7
//   Nope. Try again.
//   > 4
//   Nope. Try again.
//   > 1
//   Nope. Try again.
//   > 9
//   Guessed "9" correctly in 5 attempts!

