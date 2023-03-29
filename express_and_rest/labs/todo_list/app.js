// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware
const path = require("path");
const ejs = require('ejs')
const methodOverride = require('method-override');
const session = require('express-session');
const knex = require('./db/client');

// create an instance of the Express application
const app = express();

// Middleware to parse URL-encoded request bodies and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set the view engine to EJS and define the views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware to serve static files (CSS, JavaScript, images, etc.) in the public directory
app.use(express.static('public'));

// middleware to log HTTP requests in the console
app.use(morgan('dev'));

app.use(session({
  name: 'user',
  secret: 'your secret here',
  resave: false,
  saveUninitialized: true
}));

app.use((request, response, next) => {
  const { user } = request.session; 
  
  response.locals.username = user && user.username;
  next();
})

app.use(methodOverride((request, response) => {
  if (request.body._method) {
      const method = request.body._method;
      delete request.body._method;
      return method;
  }
}))


function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/sessions/login");
  }
  next();
}

module.exports = { requireAuth };

// Route for the homepage
app.get('/', (request, response) => {
  response.render('welcome'); // Renders the welcome template
})

const sessionRouter = require('./routes/sessions');
app.use('/sessions', sessionRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);


// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})
