const { render } = require('ejs')
const express = require('express')
const knex = require('../db/client')

const router = express.Router()

//-----------POST ROUTES--------------------------

//-----------------------Index of all Posts---------------

// the below path automatically assumes that the url has the "/posts" prefixed to it
router.get('/', (req, res) => {
    knex('posts')
        .select("title", "content", "id")
        .orderBy("created_at", "desc")
        .then(posts => {
            res.render('posts/index', { posts: posts })
        })
})

// ----------------- Render New Post Template----------
router.get('/new', (req, res) => {
    res.render('posts/new')
})

router.post('/', (request, response) => {
    console.log(request.body, request.cookies.username);

    let { title, content, image_url } = request.body;

    knex('posts')
        .insert({
            title: title,
            content: content,
            image_url: image_url
        })
        .then(data => {
            response.redirect("/posts");
        })
        .catch(ex => {
            console.error(ex);
            response.send("<h1>Something went wrong</h1>")
        });
})

// request.query ====> url?name=value&name2=value2
// request.body (urlencoding middleware required) ==> post method body information
// request.params ====> url/:name1/comment/:name2 => request.params = {name1: value1, name2: value2}

// Render details of Post
// posts/133 ==> {id: 133}
// posts/:id ===> :param name is used to show the information of the request.params

router.get('/:id', (request, response) => {
    const { id } = request.params; // const id = request.params.id;

    knex("posts")
        .where("id", id)
        .then(post => {
            console.log(post)
            response.render('posts/details', ...post);
        })
        .catch(ex => {
            console.error(ex);
            response.send("<h1>Something went wrong</h1>")
        });

})



router.get('/:id/edit', (request, response) => {
    const { id } = request.params; // const id = request.params.id;

    knex("posts")
        .where("id", id)
        .then(post => {
            console.log(post)
            response.render('posts/edit', ...post);
        })
        .catch(ex => {
            console.error(ex);
            response.send("<h1>Something went wrong</h1>")
        });

})

router.patch('/:id', (request, response) => {
    //delete post
    let { title, content, image_url } = request.body;

    knex('posts')
        .update({
            title: title,
            content: content,
            image_url: image_url
        })
        .where("id", request.params.id)
        .then(data => {
            response.redirect("/posts/" + request.params.id);
        })
        .catch(ex => {
            console.error(ex);
            response.send("<h1>Something went wrong</h1>")
        });
})


router.delete('/:id', (request, response) => {
    //delete post
    knex("posts")
        .del()
        .where("id", request.params.id)
        .then(data => {
            response.redirect("/posts");
        })
        .catch(ex => {
            console.error(ex);
            response.send("<h1>Something went wrong</h1>")
        });
})


module.exports = router