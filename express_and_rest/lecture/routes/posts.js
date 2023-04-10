const { render } = require('ejs')
const express = require('express')
const knex = require('../db/client')
const friendlyDate = require("../lib/friendlyDate")

const router = express.Router()

function authenticate(request, response, next) {
    if (request.session.user) {
        next()
    } else {
        request.session.alert = {
            type: 'warning',
            message: 'You need to be logged in'
        }
        response.redirect("/posts");
    }
}

//-----------POST ROUTES--------------------------

//-----------------------Index of all Posts---------------

// the below path automatically assumes that the url has the "/posts" prefixed to it
router.get('/', (req, res) => {
    knex
        .select("title", "content", "view_count", "username as posted_by","posts.id as id")
        .from("posts")
        .leftJoin("users", "users.id", "=", "posts.user_id")
        .then(posts => {
            res.render('posts/index', { posts })
        })
})

// ----------------- Render New Post Template----------
router.get('/new', authenticate, (req, res) => {
    res.render('posts/new')
})

router.post('/', (request, response) => {
    console.log(request.body, request.cookies.username);

    let { title, content, image_url } = request.body;

    knex('posts')
        .insert({
            title: title,
            content: content,
            image_url: image_url,
            posted_by: request.session.user.username || "Anonymous",
            user_id: request.session.user.id
        })
        .then(data => {
            response.redirect("/posts");
        })
        .catch(ex => {
            console.error(ex);
            request.session.alert = {
                type: 'warning',
                message: 'Something went wrong'
            }
            response.redirect("/posts");
        });
})

// request.query ====> url?name=value&name2=value2
// request.body (urlencoding middleware required) ==> post method body information
// request.params ====> url/:name1/comment/:name2 => request.params = {name1: value1, name2: value2}

// Render details of Post
// posts/133 ==> {id: 133}
// posts/:id ===> :param name is used to show the information of the request.params

router.get('/:id', async (request, response) => {
    const postId  = request.params.id; 

    const post = await knex("posts").where('id', postId).first()
    if (post) {
        const user = await knex('users').where('id', post.user_id).first()
        if(user) {
            post.posted_by = user.username
        } else {
            post.posted_by = 'Anonymously'
        }
        response.render('posts/details', {post, friendlyDate});
    } else {
        request.session.alert = {
            type: 'warning',
            message: 'Something went wrong'
        }
        response.redirect("/posts");
    }

})



router.get('/:id/edit', authenticate, (request, response) => {
    const { id } = request.params; // const id = request.params.id;

    knex("posts")
        .where("id", id)
        .then(post => {
            console.log(post)
            response.render('posts/edit', ...post);
        })
        .catch(ex => {
            console.error(ex);
            request.session.alert = {
                type: 'warning',
                message: 'Something went wrong'
            }
            response.redirect("/posts");
        });

})

router.patch('/:id', authenticate, (request, response) => {
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
            request.session.alert = {
                type: 'warning',
                message: 'Something went wrong'
            }
            response.redirect("/posts");
        });
})


router.delete('/:id', authenticate, (request, response) => {
    //delete post
    knex("posts")
        .del()
        .where("id", request.params.id)
        .then(data => {
            response.redirect("/posts");
        })
        .catch(ex => {
            console.error(ex);
            request.session.alert = {
                type: 'warning',
                message: 'Something went wrong'
            }
            response.redirect("/posts");
        });
})


module.exports = router