// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware

// create an instance of the Express application
const app = express();

// set the view engine to EJS and define the views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to parse URL-encoded request bodies and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// middleware to log HTTP requests in the console
app.use(morgan('dev'));

// define a route for the homepage that renders a view using EJS
app.get('/', (request, response) => {
  response.render('welcome', { 
    result: null,
    num1: null,
    num2: null 
  });
});

app.post('/', (request, response) => {
  const { operator } = request.body;
  const num1 = parseInt(request.body.num1);
  const num2 = parseInt(request.body.num2);
  let result;

  if (request.body) {
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

  console.log('result: ', result)
  response.render('welcome', { 
    num1,
    num2,
    result 
  })
})

app.get('/calculator', (request, response) => {
  response.render('calculator', { input: null });
});


// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})