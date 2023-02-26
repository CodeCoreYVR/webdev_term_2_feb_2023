const cheerio = require("cheerio");
const axios = require("axios");
const cowsay = require("cowsay");
const chalk = require("chalk");

const main = async () => {
  const productUrl = process.argv[2];
  // Step one download html of our product page
  // The axios.get method will take one argument with url of some website
  const response = await axios.get(productUrl);

  // Step number two is to create new instance of cheerio
  // cheerio.load takes one argument which should be a string with html
  const $ = cheerio.load(response.data);

  // Step number three we have to use selector to get price from some element
  let price = $("#priceblock_saleprice");
  if (price.text().trim() === "") price = $("#priceblock_ourprice");

  // If we want to get product name as well we can use cheerio selector for another element
  let productName = $("#productTitle");

  console.log(
    cowsay.say({
      text: chalk.yellow(
        `Current price for 
        ${productName.text().trim()} 
        is ${price.text()}`
      ),
    })
  );
};

main().catch(console.error);
