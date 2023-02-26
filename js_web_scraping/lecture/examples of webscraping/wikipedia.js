const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs/promises");

const main = async () => {
  // First step is to get html of wikipedia page
  const response = await axios.get(
    "https://en.wikipedia.org/wiki/Judo_at_the_2011_Pan_American_Games_%E2%80%93_Men%27s_100_kg"
  );

  // Next we have to create new instance of cheerio
  const $ = cheerio.load(response.data);
  // We use this selector to get a tag element inside the medalists table
  // So we can change the name of gold medalist
  const name = $(".infobox-full-data tr:nth-child(1) td:nth-child(2) a");
  // This is selector for the a tag element with the country of gold medalist
  const country = $(".infobox-full-data tr:nth-child(1) td:nth-child(3) a");

  // If we want to change the text value we can use .text() and put our new text
  // as a argument
  name.text("Ondrej Belza");
  // If we don't use argument inside .text() it will return current value
  name.text(); // => Ondrej Belza

  // We can also edit some attributes like href and title for example
  name.attr("href", "https://codecore.ca");
  name.attr("title", "Ondrej Belza");

  // We did the same thing for country as well
  country.text("Czech Republic");
  country.attr("href", "https://en.wikipedia.org/wiki/Czech_Republic");
  country.attr("title", "Czech Republic");

  // This will write the html into a file
  await fs.writeFile("fakeWikipedia.html", $.html());
};

main().catch(console.error);
