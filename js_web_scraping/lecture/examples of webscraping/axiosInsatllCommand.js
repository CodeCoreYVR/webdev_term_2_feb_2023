// We have to import all necessary modules
const cheerio = require("cheerio");
const cowsay = require("cowsay");
const axios = require("axios");
const chalk = require("chalk");

const main = async () => {
  // Step one get axios website html
  const response = await axios.get("https://axios-http.com/docs/intro");

  // We created new instance of cheerio
  const $ = cheerio.load(response.data);

  // We initialized an empty array for our commands
  const installCommands = [];

  // then we used selector for code element
  // This will have multiple results
  // And we will loop over all of them
  // i => index
  // el => current element
  $("code").each((i, el) => {
    // We have to start by creating new selector with the element
    let element = $(el);
    // We want to get description for install method as well
    // Se we have to select parent element and then we will select previous element
    let description = element.parent().prev();
    // then we will add new entry into our array
    // new entry will be an object with values description and command
    installCommands.push({
      description: description.text(),
      command: element.text(),
    });
  });

  // Then we will loop over our list of commands objects
  // But we don't want to show the first two of them
  // So will will just use slice method to create new array without two first entries
  installCommands.slice(2).forEach((command) => {
    // We are also using chalk to color our output
    // then we will display the description
    console.log(chalk.yellow(command.description));
    // then we will use cowsay to show the command
    console.log(
      cowsay.say({
        // We will remove whitespaces from start and the end of our command
        text: chalk.cyan(command.command.trim()),
      })
    );
  });
};

// This will call our function and catch error if error will occur
main().catch(console.error);
