// Import the Chalk package
import chalk from 'chalk';

// Import the color-name package. This is done because I can't seem to get the bgKeyword to work, looks
// like it might not work with newer versions of chalk. So I'm using bgHex instead which requires a
// hexidecimal code instead of a color word like 'red'
import colorName from 'color-name';


// Using array destructuring, parse command-line arguments to get color, width, and height
let [color = 'blue', width = 8, height = 8] = process.argv.slice(2);

// Check if the user input is a named color, and if so, convert it to a hex code
if (colorName[color]) {
  color = '#' + colorName[color].join('');
}

// Use Chalk to create a colored square for the board
color = chalk.bgHex(`${color}`)(' ');

// Define a function that returns a string representing a checkerboard pattern
const board = (color, width, height) => {
  let str = '\n'; // Initialize the string with a newline character
  let counter = 1; // Counter to alternate between colors

  // Loop through rows
  for (let i = 1; i <= height; i++) {
    // Check if this row should start with a different color
    counter = ((width % 2 === 0) && (i % 2 === 0)) ? 0 : 1;

    // Loop through columns
    for (let j = 1; j <= width; j++) {
      // Add an empty space or a colored square depending on the counter value
      (counter % 2 === 1) ? str += ' ' : str += color;

      // Increment the counter
      counter++;
    }

    // Add a newline character at the end of each row
    str += '\n';
  }

  // Return the final string representing the checkerboard pattern
  return str;
}

// Call the board function with the color, width, and height arguments, and log the resulting string to the console
console.log(board(color, width, height));