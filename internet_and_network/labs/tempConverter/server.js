// Import the http and url modules
const http = require('http');
const url = require('url');

// Create an HTTP server that handles incoming requests using a callback function
const server = http.createServer((req, res) => {
  // Parse the URL to get the query parameters
  const query = url.parse(req.url, true).query;

  // Check if the 'temp' parameter is present in the query string
  if (query.temp) {
    // Convert the temperature to Celsius
    const tempCelsius = (query.temp - 32) * 5 / 9;

    // Setting the response headers for all responses, regardless of whether the temperature parameter is present or not
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache');

    // Send an HTML page with the converted temperature
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Temperature Conversion</title>
        </head>
        <body>
          <h1>Temperature in Celsius: ${tempCelsius.toFixed(2)}</h1>
        </body>
      </html>
    `);
  } else {
    // If the 'temp' parameter is not present, send a 400 Bad Request response
    res.statusCode = 400;
    
    // Setting a response header only for the error response that is sent when the temperature parameter is missing
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request: Temperature parameter is missing.');
  }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
