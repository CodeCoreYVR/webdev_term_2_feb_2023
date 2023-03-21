const { render } = require('ejs')
const express = require('express')
const knex = require('../db/client')

const router = express.Router()

//-----------POST ROUTES--------------------------

//-----------------------Index of all Posts---------------

// the below path automatically assumes that the url has the "/posts" prefixed to it
router.get('/', (req, res) => {
    knex('posts')
    .then(posts => {
        res.render('posts/index', {posts:posts})
    })
})

// ----------------- Render New Post Template----------
router.get('/new', (req, res) => {
    res.render('posts/new')
})

module.exports = router