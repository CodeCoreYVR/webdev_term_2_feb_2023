const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require('express-session');
const knex = require("../db/client");


// ---------------------------------------------- New ----------------------------------------------
// GET method - Route to get users/signup.ejs
router.get("/signup", (request, response) => {
  response.render("users/signup");
});

// POST method - Route to save a user task to the database and encrypt their password
router.post('/signup', (request, response) => {
  const { username, password } = request.body;

  // Format the user's name to have the first letter of each word capitalized
  formattedName = username.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
  
  // Hash the user's password and save the user to the database
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      return knex('users')
        .insert({
          username: formattedName,
          password: hashedPassword
        });
    })
    .then(user => {
      // Set a success message and redirect to the login page
      request.session.alerts = [{ type: 'success', message: 'User successfully created.' }];
      response.status(201).redirect('/sessions/login');
     })
     .catch(err => {
      // If an error occurs, set an error message and redirect back to the signup page
      console.error(err.message);
      request.session.alerts = [{ type: 'error', message: 'Something went wrong, could not save user.' }];
      response.status(500).redirect('back')
     })
})

// // with async and await
// router.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     await knex("users").insert({
//       username,
//       password: hashedPassword,
//     });
//     res.redirect("/user/login");
//   } catch (err) {
//     res.send(err);
//   }
// });

module.exports = router;
