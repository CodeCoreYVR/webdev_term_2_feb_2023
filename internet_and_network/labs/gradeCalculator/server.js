// Import the http and url modules
const http = require('http');
const url = require('url');

// Create an HTTP server that handles incoming requests using a callback function
const server = http.createServer((req, res) => {
  // Parse the URL to get the query parameters
  const query = url.parse(req.url, true).query;

  // Check if the 'score' parameter is present in the query string
  if (query.score) {
    // Get the score from the query parameters and convert it to a number
    const score = Number(query.score);

    // Not needed
    let pass = ':)';

    // Calculate the letter grade based on the score
    let grade;
    if (score >= 90) {
      grade = 'A+';
    } else if (score >= 80) {
      grade = 'A';
    } else if (score >= 70) {
      grade = 'B';
    } else if (score >= 60) {
      grade = 'C';
    } else if (score >= 50) {
      grade = 'D';
    } else {
      grade = 'F';
      pass = ':(';
    }

      // Setting the response headers for all responses, regardless of whether the score parameter is present or not
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache');

    // Send an HTML page with the letter grade
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Score to Grade Conversion</title>
        </head>
        <body>
          <h1>Grade: ${grade} ${pass}</h1>
        </body>
      </html>
    `);
  } else {
    // If the 'score' parameter is not present, send a 400 Bad Request response
    res.statusCode = 400;
    
    // Setting a response header only for the error response that is sent when the score parameter is missing
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request: Score parameter is missing.');
  }
});

// Set the port and host that the server will listen on
const PORT = 3000;
const HOST = 'localhost';

// Start the server and listen for incoming connections
server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});
