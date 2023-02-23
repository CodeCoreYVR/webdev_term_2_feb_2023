import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

// Make a request for the Pugs Wikipedia page
axios.get('https://en.wikipedia.org/wiki/Pug')
  .then(response => {
    // Load the HTML into Cheerio
    const $ = cheerio.load(response.data);

  // Replace "pug" with "spud" in all <p> tags
  $('p').each((i, element) => {
    // Get the text of the current <p> element
    const text = $(element).text();

    // Replace all instances of "pug" (case-insensitive) with "spud"
    const newText = text.replace(/pug/gi, 'spud');

    // Update the text of the current <p> element with the new text
    $(element).text(newText);
  });

    // Change the title of the article
    $('h1').text('Team CodeCore!');

    // .map(indedOfElement, currentElement) is creating a new array with all <h1>, <h2>, <h3>, and <p> elements which are descendants of the <body> element
    const article = $('body').find('h1, h2, h3, p').map((i, element) => {
      // Use a switch statement to generate Markdown for different tag types
      switch (element.tagName) {
        case 'h1':
          // returning markdowns version of h1 opening and closing tags
          return `# ${$(element).text()}\n\n`;
        case 'h2':
          // returning markdowns version of h2 opening and closing tags
          return `## ${$(element).text()}\n\n`;
        case 'h3':
          // returning markdowns version of h3 opening and closing tags
          return `### ${$(element).text()}\n\n`;
        case 'p':
          // returning markdowns version of p opening and closing tags
          return `${$(element).text()}\n\n`;
        default:
          // if it's not an h1, h2, h3 or p tag then do nothing
          return '';
      }
      // This uses Cheerio's .get() method to retrieve the array of strings that was created by the .map() method and join it into a single string
    }).get().join('');

    const fileName = 'spud-page.md';

    // Write the entire article to the file
    fs.appendFileSync(fileName, article);
    console.log(`Contents successfully saved to ${fileName}`)
  })
  .catch(error => {
    console.log(error);
  });