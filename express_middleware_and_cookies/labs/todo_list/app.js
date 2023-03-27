// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware
const cookieParser = require('cookie-parser'); // Importing the cookie-parser middleware to enable parsing of cookies in HTTP requests.
const ejs = require('ejs')

// create an instance of the Express application
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

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

// Middleware function that runs on every request
// Sets a default value for todoList and username if they're not present in the cookies
app.use((request, response, next) => {
  const todoList = request.cookies.todoList || [];
  response.locals.todoList = todoList; // Sets a variable in the response object to be used in the templates
  response.locals.username = request.cookies.username || ''; // Sets a variable in the response object to be used in the templates
  next(); // Passes control to the next middleware function
});

// Route for the homepage
app.get('/', (request, response) => {
  response.render('welcome'); // Renders the welcome template
})

// Route for the todo list page
app.get('/todo', (request, response) => {
  const { todoList } = request.cookies; // Gets the todoList from the cookies
  console.log('todoList: ', todoList)
  response.render('todo/index'); // Renders the todo list index template
})

// Route for the new todo item page
app.get('/todo/new', (request, response) => {
  response.render('todo/new') // Renders the new todo item template
})

// Route for creating a new todo item
app.post('/todo/new', (request, response) => {
  const { todoList = [] } = request.cookies; // Gets the todoList from the cookies or creates an empty array
  const { title, body } = request.body; // Extracts the title and body of the new todo item from the request body

  todoList.push({ title, body }); // Adds the new todo item to the todoList array
  response.cookie('todoList', todoList); // Sets the todoList cookie with the updated todoList array
  const reminderIndex = todoList.length - 1; // Gets the index of the new todo item

  response.redirect(`${reminderIndex}/show`); // Redirects to the show page for the new todo item
});

// Route for showing a single todo item
app.get('/todo/:index/show', (request, response) => {
  const reminderIndex = request.params.index; // Gets the index of the todo item from the URL parameter

  if (request.cookies.todoList[reminderIndex]) { // Checks if the todo item exists in the todoList array
    response.render('todo/show', { reminderIndex }); // Renders the show template for the todo item
  } else {
    response.status(404).send('Reminder not found...'); // Sends a 404 status code and error message if the todo item doesn't exist
  }
});

// Route for handling user login
app.get('/user/login', (request, response) => {
  let { username } = request.query; // Gets the username from the query string parameters
  
  if (username) { // Checks if the username is not empty
    username = username.charAt(0).toUpperCase() + username.slice(1) // Capitalizes the first letter of the username
    response.cookie('username', username); // Sets the username cookie with the updated username
    response.redirect('/'); // Redirects to the homepage
  } else {
    response.render('user/login'); // Renders the login template if the username is empty
  }
})

// Logout route
app.get('/user/logout', (request, response) => {
  response.clearCookie('username'); // Clear the cookie named "username" to log the user out
  response.redirect('/'); // Redirect the user to the homepage
  })


// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})
