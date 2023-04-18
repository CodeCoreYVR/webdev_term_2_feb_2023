const { render } = require('ejs')
const express = require('express')
const knex = require('../db/client')
const router = express.Router()
const bcrypt = require("bcrypt")

router.get("/new", (request, response) => {
    response.render("session/new");
})

router.post("/", async (request, response) => {

    const { username, password } = request.body;

    const user = await knex('users').where("username", username).first();

    if(user)
    {
        const isValid = await bcrypt.compare(password, user.password);
        if(isValid)
        {
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
        else {
            request.session.alert = {
                type: 'warning',
                message: 'Password was incorrect'
            }
            response.redirect('/session/new')
        }
    }
    else {
        request.session.alert = {
            type: 'warning',
            message: 'User was not found'
        }
        response.redirect('/session/new')
    }
})

router.delete("/", (request, response) => {
    request.session.destroy(() => {
        response.locals.username = null;
        response.redirect("/")
    })
})

module.exports = router