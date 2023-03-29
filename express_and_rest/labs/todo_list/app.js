// import required dependencies
const express = require('express'); // Import the Express web framework
const morgan = require('morgan'); // Import the HTTP request logger middleware
const path = require("path"); // Import the Node.js path module
const ejs = require('ejs') // Import the EJS view engine
const methodOverride = require('method-override'); // Import the method-override middleware
const session = require('express-session'); // Import the express-session middleware
const knex = require('./db/client'); // Import the knex database client

// create an instance of the Express application
const app = express();

// Middleware to parse URL-encoded request bodies and JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.json()); // Parse JSON request bodies

// set the view engine to EJS and define the views directory
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', 'views'); // Define the views directory

// Middleware to serve static files (CSS, JavaScript, images, etc.) in the public directory
app.use(express.static('public')); // Serve static files in the 'public' directory

// middleware to log HTTP requests in the console
app.use(morgan('dev')); // Use the morgan middleware with 'dev' logging

// Set up the express-session middleware
app.use(session({
  name: 'user',
  secret: 'your secret here',
  resave: false,
  saveUninitialized: true
}));

// Middleware to set response locals for the current user
app.use((request, response, next) => {
  const { user } = request.session; 
  
  response.locals.username = user && user.username;
  next();
});

// Middleware to handle http DELETE, PATCH, and PUT requests
app.use(methodOverride((request, response) => {
  if (request.body._method) {
      const method = request.body._method;
      delete request.body._method;
      return method;
  }
}));

// Middleware to add flash messages to response locals
app.use(function(req, res, next) {
  res.locals.alerts = req.session.alerts || [];
  req.session.alerts = [];
  next();
});

// Middleware function to check if user is authenticated
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/sessions/login");
  }
  next();
}

// Export the requireAuth middleware function
module.exports = { requireAuth };

// Route for the homepage
app.get('/', (request, response) => {
  response.render('welcome'); // Render the 'welcome' template
});

// Import and mount the sessionRouter for '/sessions' routes
const sessionRouter = require('./routes/sessions');
app.use('/sessions', sessionRouter);

// Import and mount the userRouter for '/users' routes
const userRouter = require('./routes/users');
app.use('/users', userRouter);

// Import and mount the taskRouter for '/tasks' routes
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);


// Define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// Start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
});
