// This will import cheerio module
const cheerio = require("cheerio");
// This will import axios module
const axios = require("axios");
const cowsay = require("cowsay");
const chalk = require("chalk");

const main = async () => {
  // First we will download the html of axios website
  let response = await axios.get("https://axios-http.com/docs/intro");

  // Then we will create new instance of cheerio
  const $ = cheerio.load(response.data);
  // We will use the selector for id features and we will select element that is
  // after this one
  // This is the structure
  // And we dont care about the h3
  // But we care about the ul after that
  // That's why we are using the .next
  // <h3 id='features'> </h3>
  // <ul>
  //    <li> <li>
  // </ul>
  let featuresList = $("#features").next();

  // Then we will console log message
  console.log(chalk.bgBlue.red("This is list of axios features"));

  //Then we will loop over child elements of our ul
  featuresList.children().each((index, element) => {
    // We have to create new variable and use the cheerio selector again
    // And we can just pass the element from our each function
    let currentElement = $(element);

    // then we will just display each feature with cowsay
    console.log(
      cowsay.say({
        text: chalk.yellow(currentElement.text()),
      })
    );
  });
};

// if we get an error we will console.error it
main().catch((err) => console.error);
