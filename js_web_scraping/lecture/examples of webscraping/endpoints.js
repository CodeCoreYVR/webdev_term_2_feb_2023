// We imported all required modules
const cheerio = require("cheerio");
const chalk = require("chalk");
const axios = require("axios");
const cowsay = require("cowsay");

const main = async () => {
  // then we downloaded the html of our site
  const response = await axios.get("https://jsonplaceholder.typicode.com/");

  // now we have to create new instance of cheerio
  const $ = cheerio.load(response.data);

  // we will create new variable resources wich will hold all possible resources
  const resources = [];
  // And an array routes for our routes
  const routes = [];

  // We will use selector with following options
  // table = element
  // :nth-of-type = if there is multiple tables this will select the first one
  // tbody this will select body of our table
  // tr stands for table row
  // .each will loop over table rows
  $("table:nth-of-type(1) tbody tr").each((rowIndex, el) => {
    // We have to wrap our element into cheerio
    let row = $(el);
    // then we will add empty object to our array
    resources.push({});
    // And for each column in this table we will do following loop
    row.children().each((columnIndex, columnElement) => {
      // We will start by wrapping  columnElement with cheerio
      let column = $(columnElement);
      // then we will check if columnIndex is 0 or 1
      // 0 == false
      // 1 == true
      // so if columnIndex is 0 this will be the path column
      // and if columnIndex is 1 this will be description column
      if (columnIndex) {
        // Then we will set either description or path
        // to object inside resources array at the rowIndex
        // for example resources[1].description will update second element in resources array
        resources[rowIndex].description = column.text();
      } else {
        resources[rowIndex].path = column.text();
      }
    });
  });

  // We will do the same for routes
  $("table:nth-of-type(2) tbody tr").each((rowIndex, el) => {
    let row = $(el);
    routes.push({});
    row.children().each((columnIndex, columnElement) => {
      let column = $(columnElement);
      if (columnIndex) {
        routes[rowIndex].description = column.text();
      } else {
        routes[rowIndex].path = column.text();
      }
    });
  });

  // Then we will display the result of our function
  console.log(chalk.cyan("You can use one of the following resources"));
  // For each row in resources
  resources.forEach((row) => {
    // We will create new text with resource value and  description
    let rowText = chalk.blue("Resource: " + row.path) + "\n";
    rowText += chalk.red(row.description);
    // And display it to the user
    console.log(
      cowsay.say({
        text: rowText,
      })
    );
  });

  //Same for routes
  console.log(chalk.cyan("You can use one of the following routes"));
  routes.forEach((row) => {
    let rowText = chalk.blue("Method: " + row.path) + "\n";
    rowText += chalk.red("Route: " + row.description);
    console.log(
      cowsay.say({
        text: rowText,
        // changes cow to squirrel
        f: "squirrel",
      })
    );
  });
};

main().catch(console.error);
