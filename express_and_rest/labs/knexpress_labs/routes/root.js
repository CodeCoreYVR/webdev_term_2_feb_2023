// import the Express framework and create a router object
const express = require("express");
const router = express.Router();


// ---------------------------------------------- Home ----------------------------------------------
// GET method - Route for the homepage
router.get('/', (request, response) => {
  response.render('welcome'); // Renders the welcome template
});

// Export the router object so that it can be used in other files
module.exports = router;
