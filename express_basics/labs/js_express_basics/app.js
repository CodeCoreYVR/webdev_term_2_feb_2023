// import required dependencies
const express = require('express'); // Express web framework
const morgan = require('morgan'); // HTTP request logger middleware
const fs = require('fs');
const path = require('path');

// create an instance of the Express application
const app = express();

// set the view engine to EJS and define the views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to parse URL-encoded request bodies and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware to log HTTP requests in the console
app.use(morgan('dev'));

// define a route for the homepage that renders a view using EJS
app.get('/', (request, response) => {
    response.render('welcome', {
        title: 'Welcome to Labs for day 17, Express Basics home page'
    });
});

// define a route for the car status page that renders a view using EJS
// with default values of null for yearOfCar and carStatus
app.get('/car_status', (request, response) => {
    response.render('car_status', { yearOfCar: null, carStatus: null });
});

// define a route to handle form submissions for the car status page
app.post('/car_status', (request, response) => {
    // log the URL query parameters in the console
    console.log('URL Query:', request.query);

    // parse the year of the car from the form submission
    let yearOfCar = parseInt(request.body.yearOfCar);

    // set the car status based on the year of the car
    let carStatus;
    if (yearOfCar > 2021) {
        carStatus = 'future';
    } else if (yearOfCar > 2010) {
        carStatus = 'new';
    } else if (yearOfCar > 1990) {
        carStatus = 'old';
    } else {
        carStatus = 'very old'
    };

    // render the car status view with the year of the car and car status
    response.render('car_status', {
        yearOfCar,
        carStatus
    });
});
// Set up a GET route for /fizz_buzz that renders a view called fizz_buzz.ejs
app.get('/fizz_buzz', (request, response) => {
  // Render the fizz_buzz view, passing in initial values for numbers, number1, and number2
  // These values are set to null for now because the user hasn't entered anything yet
  response.render('fizz_buzz', {
    numbers: null,
    number1: null,
    number2: null
  });
});

// Set up a POST route for /fizz_buzz that gets called when the user submits the form on the fizz_buzz view
app.post('/fizz_buzz', (request, response) => {
  // Parse the values for number1 and number2 from the request body
  const number1 = parseInt(request.body.number1);
  const number2 = parseInt(request.body.number2);

  // Create an empty array to hold the FizzBuzz output
  const numbers = [];

  // Set up a counter variable to keep track of the current number
  let counter = 1;

  // Loop from 1 to 100, adding each number or FizzBuzz output to the numbers array
  while (counter <= 100) {
    // If the current number is divisible by both number1 and number2, add 'FizzBuzz' to the array
    if (counter % number1 === 0 && counter % number2 === 0) {
      numbers.push('FizzBuzz');
    }
    // If the current number is only divisible by number1, add 'Fizz' to the array
    else if (counter % number1 === 0) {
      numbers.push('Fizz');
    }
    // If the current number is only divisible by number2, add 'Buzz' to the array
    else if( counter % number2 === 0) {
      numbers.push('Buzz');
    }
    // If the current number is not divisible by either number1 or number2, add the number to the array
    else {
      numbers.push(counter);
    }
    // Increment the counter
    counter++;
  };

  // Render the fizz_buzz view again, passing in the updated values for numbers, number1, and number2
  response.render('fizz_buzz', {
    numbers,
    number1,
    number2
  });
});

app.get('/directory_lister', (request, response) => {
  const rootDir = process.cwd(); // get the current working directory
  const filesAndDirs = fs.readdirSync(rootDir); // read all files and directories in the root directory
  const listItems = filesAndDirs.map(item => {
    const itemPath = path.join(rootDir, item); // create a path to the item
    const isDir = fs.lstatSync(itemPath).isDirectory(); // check if the item is a directory
    const link = isDir ? path.join('/directory_lister', item) : path.join('/', item); // create a link to the item
    
    return `<li><a href="${link}">${item}${isDir ? '/' : ''}</a></li>`; // create a list item with a link
  }).join('');

  const html = `<ul>${listItems}</ul>`; // create an unordered list with all the items
  response.send(html); // send the HTML as a response
});

// define a route handler for the /directory_lister path
app.get('/directory_lister', (req, res) => {
  // use fs.readdir to read all files and directories from the root of your project
  const rootDir = path.dirname(require.main.filename);
  const filesAndDirs = fs.readdirSync(rootDir);

  // render the directory_lister view and pass in the filesAndDirs array as a variable
  res.render('directory_lister', { filesAndDirs });
});

// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})