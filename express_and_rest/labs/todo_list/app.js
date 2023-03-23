// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware
const path = require("path");
const ejs = require('ejs')
const knex = require('./db/client')

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

// Route for the homepage
app.get('/', (request, response) => {
  response.render('welcome'); // Renders the welcome template
})

app.get('/tasks', (request, response) => {
  console.log('here')
  knex('tasks')
    .select('id', 'body')
    .orderBy('created_at', 'DESC')
    .then(tasks => {
      response.render('index', { tasks })
    })
    .catch(err => {
      console.error(err.message);
      response.send(`<h1>Something happened, tasks weren't able to be retrevied from database...</h1>`);
    });
});

app.post('/tasks', (request, response) => {
  const { body } = request.body;
  console.log('body: ', body)
  knex('tasks')
    .insert({ body })
    .then( data => {
      response.redirect('/tasks');
    })
    .catch(err => {
      console.error(err.message);
      response.send(`<h1>Something happened, your task wasn't created...</h1>`);
    });
});

// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})
