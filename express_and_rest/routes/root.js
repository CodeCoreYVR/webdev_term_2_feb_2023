const { render } = require('ejs')
const express = require('express')
const knex = require('../db/client')

const router = express.Router()


router.get("/", (request, response) => {
    // response.send("<h2>Welcome to the express app!</h2>")
    response.render("welcome");
})

router.get("/hello_world", (request, response) => {
    response.send("<h2>Hello world!</h2>")
})

router.get("/survey", (request, response) => {
    response.render("survey");
})

router.get("/thank_you", (request, response) => {

    let { name, hobby, pet, javascript, c, ruby } = request.query;

    response.render("thank_you", {
        name, //name: name
        hobby,
        javascript: javascript || "",
        c: c || "",
        ruby: ruby || "",
        pet
    });
})

const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days expiry time.
router.post("/sign_in", (request, response) => {
    const { username } = request.body; // uses middleware express.urlencoded => const username = request.body.username;
    response.cookie("username", username, { maxAge: maxAge }); // uses middleware cookieparser cookie("nameOfCookie", "valueOfCookie"); 
    response.redirect("/");
})

router.post("/sign_out", (request, response) => {
    response.clearCookie("username");
    response.redirect("/");
})

module.exports = router;