// We will not be using "require" for chalk
// const chalk = require('chalk');

// We will use "import" instead. This also needs "type": "module" to be added to package.json in order to use "import"
import chalk from 'chalk';

// 1) print the words "hello world" in blue
console.log(chalk.blue('hello world'));
// 2) print the words "hello world" in red with a blue background
console.log(chalk.bgBlue.red('hello world'));

// 3) print the words "hello world" in green with a red background in bold
console.log(chalk.bgRed.bold.green('hello world'));

// 4) print the words "hello world" in yellow with a black background bold and underlined
console.log(chalk.bgBlack.yellow.bold.underline('hello world'));

// 5) print the words "hello world" in yellow with a black background bold underlined and italic
console.log(chalk.bgBlack.yellow.bold.underline.italic('hello world'));





// Using the chalk library do the following:
// Chalk documentation here.

// 1) print the words "hello world" in blue
// 2) print the words "hello world" in red with a blue background
// 3) print the words "hello world" in green with a red background in bold
// 4) print the words "hello world" in yellow with a black background bold and underlined
// 5) print the words "hello world" in yellow with a black background bold underlined and italic