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

// middleware to log HTTP requests in the console
app.use(morgan('dev'));

// define a route for the homepage that renders a view using EJS
app.get('/', (request, response) => {
    response.render('welcome', {
        title: 'Welcome to Labs for day 17, Express Basics home page'
    })
});

// define a route for the car status page that renders a view using EJS
// with default values of null for yearOfCar and carStatus
app.get('/car_status', (request, response) => {
    response.render('car_status', { yearOfCar: null, carStatus: null })
})

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
    }

    // render the car status view with the year of the car and car status
    response.render('car_status', {
        yearOfCar,
        carStatus
    });
})

// define the port and domain that the server will listen on
const PORT = 3000;
const DOMAIN = 'localhost';
// start the server and log a message to the console
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})