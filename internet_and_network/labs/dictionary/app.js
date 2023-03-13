const http = require('http');
const url = require('url');
const fs = require('fs');

// Load the dictionary and create a global variable for the dictionary object outside of the server creation 
// function, and load the dictionary only once when the server starts up
const dictionary = {};
const dictionaryLines = fs.readFileSync('dictionary.txt').toString().split('\n');
// Iterate over each line of the dictionary and add it to the dictionary object
for (let line of dictionaryLines) {
  // Split the line into a word and a definition
  const [word, definition] = line.split('  ');
  // Add the word and definition to the dictionary object
  dictionary[word] = definition;
}

// Create an HTTP server that handles incoming requests using a callback function
const server = http.createServer((req, res) => {
  
  // Set response header. This isn't needed in this case but is still good practice as the server will set the 
  // Content-Type header to text/html by default,
  res.setHeader('Content-Type', 'text/html');

  // Get the query parameter from the URL
  const queryObject = url.parse(req.url, true).query;
  // Convert the word to lowercase, then capitalize the first letter
  let wordLowerCase = queryObject.word.toLowerCase();
  word = wordLowerCase[0].toUpperCase() + wordLowerCase.slice(1);

  // Look up the word in the dictionary
  const definition = dictionary[word];

  // Return the definition or a message indicating the word was not found
  
  // If no word was entered in the query parameter, display a welcome message
  if (!word) {
    res.write('<h1>Welcome to Dictionary</h1>');
  } 
  // If a definition is found for the queried word, display the word and its definition
  else if (definition) {
    res.write(
      `<h1>Definition of ${word}:</h1>
      <h3>${definition}</h3>`
    );
  } 
  // If a definition is not found for the queried word, display an error message
  else {
    res.write(`<h1>Sorry, ${word} is not in the dictionary.</h1>`);
  }
  // signal to the server that all of the response headers and body have been sent.
  res.end();
});

// Start the server and listen for incoming connections
const PORT = 5000;
const HOST = 'localhost';

// Start the server and log a message to the console
server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});