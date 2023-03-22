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

app.use((request, response, next) => {
  const todoList = request.cookies.todoList || [];
  response.locals.todoList = todoList;
  next();
});

app.get('/', (request, response) => {
  response.render('welcome');
})

app.get('/todo', (request, response) => {
  const { todoList } = request.cookies;
  console.log('todoList: ', todoList)
  response.render('todo/index');
})

app.get('/todo/new', (request, response) => {
  response.render('todo/new')
})

app.post('/todo/new', (request, response) => {
  console.log('line 48')
  const { todoList = [] } = request.cookies;
  console.log('todoList: ', todoList);
  const { title, body } = request.body;
  console.log('title, body: ', title, body);

  todoList.push({ title, body });
  response.cookie('todoList', todoList);
  const reminderIndex = todoList.length - 1;

  response.redirect(`${reminderIndex}/show`);
});

app.get('/todo/:index/show', (request, response) => {
  const reminderIndex = request.params.index;

  if (request.cookies.todoList[reminderIndex]) {
    response.render('todo/show', { reminderIndex });
  } else {
    response.status(404).send('Reminder not found...');
  }
});


// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})
