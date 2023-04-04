const { render } = require('ejs')
const express = require('express')
const knex = require('../db/client')
const router = express.Router()
const bcrypt = require("bcrypt")

router.get("/new", (request, response) => {
    response.render("users/new");
})

router.post("/", async (request, response) => {
    const { username, password } = request.body;

    // 1. round 10 times to generate the hash from the provided password with the salt using hash algo. 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await knex("users").insert({
            username,
            password: hashedPassword
        }, "*");

        request.session.user = {
            id: user.id,
            username: user.username
        }

        request.session.alert = {
            type: 'info',
            message: `Welcome, ${user.username}`
        }
        
        response.redirect("/");
    }
    catch (err) {
        console.error(err);
        request.session.alert = {
            type: 'warning',
            message: err.detail
        }
        response.redirect("/users/new")
    }
})



module.exports = router