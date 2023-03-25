// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware
const methodOverride = require('method-override'); // middleware to override HTTP methods
const ejs = require('ejs'); // templating engine

const rootRouter = require('./routes/root'); // root route
const noteRouter = require('./routes/notes'); // notes route

// create an instance of the Express application
const app = express();

// Middleware to parse URL-encoded request bodies and JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// set the view engine to EJS and define the views directory
app.set('view engine', 'ejs'); // use EJS as the templating engine
app.set('views', 'views'); // set the directory for views

// Middleware to serve static files (CSS, JavaScript, images, etc.) in the public directory
app.use(express.static('public'));

// middleware to log HTTP requests in the console
app.use(morgan('dev'));

// middleware to override HTTP methods
app.use(methodOverride((request, response) => {
  if (request.body._method) { // check if _method property exists in request body
      const method = request.body._method;
      delete request.body._method;
      return method; // return the overridden HTTP method
  }
}));

// root route
app.use('/', rootRouter);

// notes route
app.use('/notes', noteRouter);

// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
});
