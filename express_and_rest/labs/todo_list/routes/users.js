const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const knex = require("../db/client");


// GET method - Route to get users/signup.ejs
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// POST method - Route to save a user task to the database and encrypt their password
router.post('/signup', (request, response) => {
  const { username, password } = request.body;

  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      return knex('users')
        .insert({
          username,
          password: hashedPassword
        });
    })
    .then(user => {
      console.log('User successfully created...')
      response.status(201).redirect('/users/login');
     })
     .catch(err => {
      console.error(err.message);
      response.status(500).send({ error: 'Something went wrong, could not save user' })
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
