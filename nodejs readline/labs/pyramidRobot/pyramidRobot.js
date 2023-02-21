const readline = require('readline');
const fs = require('fs');

// Create a readline interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for the height of the pyramid
rl.question('How tall is the pyramid?\n> height: ', (heightInput) => {
  // Parse the user input as an integer
  const height = parseInt(heightInput);

  // If the input is not a valid number, print an error message and exit
  if (isNaN(height)) {
    console.log('Invalid input. Please enter a number.');
    rl.close();
    return;
  }

  // Create a string to hold the pyramid
  let pyramid = '\n';

  // Loop through each row of the pyramid and add it to the pyramid string
  for (let i = 1; i <= height; i++) {
    // Add spaces to center the row
    pyramid += ' '.repeat(height - i);
    // Add the asterisks for this row
    pyramid += `${'* '.repeat(i)}\n`;
  }

  // Print the completed pyramid to the console
  console.log(pyramid);

  // Prompt the user for a filename to save the pyramid to
  rl.question('Where do you want to write this pyramid?\n> ', (fileName) => {
    // Write the pyramid string to the specified file
    fs.writeFile(`${fileName}.txt`, pyramid, (err) => {
      // If there is an error, print it to the console
      // Otherwise, print a success message
      err ? console.log(err) : console.log(`Successfully wrote pyramid to ${fileName} to disk.`)
      // Close the readline interface
      rl.close();
    });
  });
});



// [Lab] Pyramid Robot 

// Create a script, pyramidRobot.js. When the user runs the script, it should prompt 
// the user for the a height. Use the height to draw a pyramid of asterisks (i.e. *) 
// with height number of rows. If the program doesn't recognize the input as a 
// number, ask the user again for a different input. Each row of the pyramid should 
// have one more asterisk than the row above it.

// After creating the pyramid, prompt the user for a file name. Create a file 
// containing the pyramid of the height with the name of the given file name.


// Here's a sample interaction with the script:
//   $ node pyramidRobot.js
//   How tall is the pyramid?
//   > height: 5
//   Where do you want to write this pyramid?
//   > five-pyramid.txt
//   Successfully wrote pyramid to five-pyramid.txt to disk.
//   $ cat five-pyramid.txt
//       *
//      * *
//     * * *
//    * * * *
//   * * * * *