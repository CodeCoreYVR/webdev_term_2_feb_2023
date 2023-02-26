// First we have to require the "cheerio" module
const cheerio = require("cheerio");

// This will load html from string
const $ = cheerio.load(`
    <a id='linkToGoogle' href='https://google.com'>Go to google</a>
    <p class='content'>This is my text</p>
    <p class='content'>This is my text number two</p>"
`);

// Then we can use selectors and jQuery like api on $
// For example this will select element with id linkToGoogle and it will
// extract value from href attribute
const link = $("#linkToGoogle").attr("href");
console.log(link);

// We can also loop over an list of elements
$(".content").each((index, element) => {
  // But for each element we have to create a new $() selector
  let pTag = $(element);
  // Then we can use same functions like .text() ....
  console.log(`${index} | ${pTag.text()}`);
});
