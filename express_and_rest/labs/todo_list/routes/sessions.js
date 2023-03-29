const express = require('express'); // import the express library
const router = express.Router(); // create a new router instance
const bcrypt = require('bcrypt'); // import the bcrypt library for password hashing
const knex = require('../db/client'); // import the knex library to interact with the database
const session = require('express-session'); // import the express-session library for session management


// ---------------------------------------------- New ----------------------------------------------
// GET method - Route to retrieve sessions/login page
router.get('/login', (request, response) => {
  response.render('sessions/login'); // render the login template
});

// POST method - Route to save a new session 
router.post('/login', async (request, response) => {
  const { username, password } = request.body; // get the username and password from the request body
  formattedName = username.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' '); // format the username for database search

  const user = await knex('users').where('username', formattedName).first(); // search the database for a user with the specified username
  if (!user) { // if the user doesn't exist, set an error message and render the login template with a 500 status code
    request.session.alerts = [{ type: 'error', message: 'Invalid username or password' }];
    return response.status(500).render('sessions/login');
  }

  const passwordMatch = await bcrypt.compare(password, user.password); // compare the password from the request to the user's hashed password in the database

  if (!passwordMatch) { // if the passwords don't match, set an error message and render the login template with a 500 status code
    request.session.alerts = [{ type: 'error', message: 'Invalid username or password' }];
    return response.status(500).render('sessions/login');
  }

  request.session.user = user; // if the user is successfully authenticated, set the user object in the session
  request.session.alerts = [{ type: 'success', message: 'Successfully logged in' }]; // set a success message in the session
  response.status(200).redirect('/tasks'); // redirect the user to the tasks page
});


// --------------------------------------------- DELETE ----------------------------------------------
// GET method - Route to delete the session
router.get('/logout', (request, response) => {
  request.session.destroy(); // destroy the session
  const alert = encodeURIComponent('Successfully logged out'); // set a success message to display on the logout page
  response.render('sessions/logout', { alert }); // render the logout template with the success message
});

module.exports = router;
