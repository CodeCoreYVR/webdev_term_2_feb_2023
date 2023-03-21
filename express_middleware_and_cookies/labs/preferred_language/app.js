// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware
const cookieParser = require('cookie-parser'); // Importing the cookie-parser middleware to enable parsing of cookies in HTTP requests.

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

// Route to render the home page
app.get('/', (req, res) => {
  const name = req.cookies.name || ''; // Get the name cookie value, or an empty string if it doesn't exist
  const language = req.cookies.language || ''; // Get the language cookie value, or an empty string if it doesn't exist

  let greeting = 'Welcome to My Awesome Website'; // Default greeting
  if (name && language) { // Check if both name and language cookies are set
    switch (language) {
      case 'en':
        greeting = `Hello ${name}`;
        break;
      case 'fr':
        greeting = `Bonjour ${name}`; // Update greeting with French greeting
        break;
      case 'es':
        greeting = `Hola ${name}`;
        break;
    }
  }

  res.render('home', { greeting }); // Render home page with the greeting variable passed as an object
});

// Route to render the language selection page
app.get('/language_selection', (req, res) => {
  res.render('language_selection'); // Render the language selection page
});

// setting cookie max age to 3 seconds. For me, this makes testing easier
const COOKIE_MAX_AGE = 1000 * 3;
// Route to handle form submission from the language selection page
app.post('/language_selection', (req, res) => {
  const { name, language } = req.body; // Destructure the name and language values from the form submission

  res.cookie('name', name, { maxAge: COOKIE_MAX_AGE }); // Set the name cookie with the value submitted from the form
  res.cookie('language', language, { maxAge: COOKIE_MAX_AGE }); // Set the language cookie with the value submitted from the form

  res.redirect('/'); // Redirect back to the home page
});

// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})
