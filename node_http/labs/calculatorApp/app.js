// Importing url, http, and fs modules
const urlMod = require('url');
const http = require('http'); 
const fs = require('fs/promises'); 

// Creating a server instance
const server = http.createServer((req, res) => {

  // Parsing URL and query parameters from the request
  const url = req.url.split('?')[0]; // gets the URL path and removes the query string
  const params = urlMod.parse(req.url, true).query; // gets the query parameters as an object

    
  console.log('url: ', url)

  // Check for favicon.ico request and handle it
  if (req.url === '/favicon.ico') {
    res.writeHead(204, {'Content-Type': 'image/x-icon'}); // sets the response header with a 204 status code and content type of image/x-icon
    res.end(); // ends the response
    return; // exits the callback function
  }

  // Handle requests for static files (e.g., CSS and JavaScript)
  if (url.includes(".") && !url.endsWith("/")) {
    // Get file name and extension from the URL path
    const filename = url.split("/").pop(); // gets the file name from the URL path by removing everything before the last slash
    const extension = filename.split(".").pop(); // gets the file extension by removing everything before the last dot

    // Map file extensions to content types
    const contentType = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript"
    }[`.${extension}`]; // uses an object to map file extensions to content types
    console.log('contentType: ', contentType)
      

    // Read the file and send its contents as a response
    fs.readFile(`.${url}`, { encoding: "utf-8" })
      .then(data => {
        res.writeHead(200, { "content-type": contentType }); // sets the response header with a 200 status code and the appropriate content type
        res.write(data); // writes the file contents to the response
        res.end(); // ends the response
      })
      .catch(console.error); // handles any errors that occur
    // return; // exits the callback function
  }

  // Handle requests for the home page
  if (url === '/') { 
    res.writeHead(200, { 'content-type': 'text/html' }); // sets the response header with a 200 status code and content type of text/html

    let num1;
    let operator;
    let num2;
    let result;

    if (params) {
      num1 = parseInt(params.num1);
      operator = params.operator;
      num2 = parseInt(params.num2);
    
      // use a switch statement to perform the appropriate calculation based on the operator
      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
      }
    }

    console.log("params: ", !params)
    const formula = `<div class="container">${num1} ${operator} ${num2} = ${result}</div>`

    // Send HTML content as a response
    res.write(`
      <head>
        <link rel="stylesheet" type="text/css" href="stylesheet/style.css">
      </head>
      <main>         
        <h1>Welcome to the Calculator App!</h1>
        <div class="container">
          <form action='/' method='get'>
            <label for='num1'>Enter the first number:</label>
            <input type='number' id='num1' name='num1' required><br><br>
            <label for='operator'>Choose an operator:</label>
            <select id='operator' name='operator' required>
              <option value=''>--Please choose an operator--</option>
              <option value='+'>+</option>
              <option value='-'>-</option>
              <option value='*'>*</option>
              <option value='/'>/</option>
            </select><br><br>
            <label for='num2'>Enter the second number:</label>
            <input type='number' id='num2' name='num2' required><br><br>
            <input type='submit' value='Calculate'>
          </form>
        </div>
        ${result ? formula : ''}
      </main>
    `)

    return res.end();
  }

  // Handle errors that occur while processing the request
  req.on('error', err => {
    console.error(err);
  });
});


const PORT = 3000; // set the port to listen on
const DOMAIN = 'localhost'; // set the domain to listen on

// Start the server and listen for incoming requests on the specified port and domain
server.listen(PORT, DOMAIN, () => {
  console.log('server listening');
});