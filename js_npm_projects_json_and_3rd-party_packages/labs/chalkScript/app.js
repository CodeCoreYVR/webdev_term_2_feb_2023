// Import the necessary modules
import chalk from 'chalk'; // Allows for text styling and coloring
import readline from 'readline'; // Allows for user input through the command line
import convert from 'color-convert'; // Allows for converting color names to hexadecimal values. For these labs this is an easier way than color-name which was used in chalkerBoard

// Create a readline interface to read user input
const rl = readline.createInterface({
  input: process.stdin, // Read input from the command line
  output: process.stdout // Output the results to the command line
});

// Ask the user to enter a string, color, background color, and text augmentations
rl.question('Enter a string: ', (string) => {
  rl.question('Enter a color: ', (color) => {
    rl.question('Enter a background color: ', (bgColor) => {
      rl.question('Enter text augmentations separated by spaces (italic, bold, strikethrough, underline): ', (augmentations) => {
        
        // Store the text augmentations that the user wants to apply
        const appliedStyles = [];
        if (augmentations.includes('italic')) { appliedStyles.push(chalk.italic) }
        if (augmentations.includes('bold')) { appliedStyles.push(chalk.bold) }
        if (augmentations.includes('strikethrough')) { appliedStyles.push(chalk.strikethrough) }
        if (augmentations.includes('underline')) { appliedStyles.push(chalk.underline) }
        
        // Apply the selected text augmentations to the string
        const styledString = appliedStyles.reduce((acc, curr) => curr(acc), string);

        // Convert the selected colors from names to hexadecimal values
        const hexColor = convert.keyword.hex(color);
        const hexBgColor = convert.keyword.hex(bgColor);

        // Apply the selected colors to the styled string
        const coloredString = chalk.hex(hexColor).bgHex(hexBgColor)(styledString);
        
        // Output the final result to the command line
        console.log(coloredString);
        
        // Close the readline interface
        rl.close();
      });
    });
  });
});