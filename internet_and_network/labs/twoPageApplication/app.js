// Import the http, url, fs, and path modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Create a new HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);

  // If the pathname is '/', return a welcome message
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to my application</h1>');
    res.end();
  } 
  // If the pathname is '/greeting', return a greeting message with the provided name or "World"
  else if (parsedUrl.pathname === '/greeting') {
    const name = parsedUrl.query.name || 'World';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Hello ${name}!</h1>`);
    res.end();
  } 
  // Otherwise, try to serve a file
  else {
    // Construct the file path
    const filePath = path.join(__dirname, 'static', parsedUrl.pathname);

    // Check if the file exists. fs.access is a method in the Node.js built-in fs module that checks the accessibility of a file
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // If the file does not exist, return a 404 Not Found error
        // This is a good way to go about it for security purposes
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 Not Found</h1>');
        res.end();
      } else {
        // If and only if the file exists, determine its content type
        const ext = path.extname(filePath).substring(1);
        const contentType = {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'gif': 'image/gif',
          'css': 'text/css',
        }[ext] || 'text/plain';

        // Read the file
        fs.readFile(filePath, (err, data) => {
          if (err) {
            // If there was an error reading the file, return a 500 Internal Server Error
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write('<h1>500 Internal Server Error</h1>');
            res.end();
          } else {
            // If the file was successfully read, serve it with the appropriate content type
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
          }
        });
      }
    });
  }
});

// Set the port and host of the server
const PORT = 8080;
const HOST = 'localhost';

// Start the server and log a message to the console
server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});

