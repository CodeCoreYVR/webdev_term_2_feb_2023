
const cookieParser = require('cookie-parser');
const express = require('express');
const log = require('morgan');
const path = require("path");
const methodOverride = require("method-override");

// Requiring the "express" package returns a function that creates
// an instance of the express application. More info here:
// http://expressjs.com/en/4x/api.html
const app = express();

//app is using the Morgan middleware/plugin to log http response and request.
app.use(log(':method :url :status :res[content-length] - :response-time ms'));

// Some server use 'static' instead of 'public'. When client request for any static/public resource, 
// web server framework looks in this directory (images, css, js and so on).
app.use(express.static(path.join(__dirname, "public")))

// Middleware to parse our cookie
app.use(cookieParser())

// Middleware for x-www-urlencoded body
app.use(express.urlencoded({ extended: true }))

// Write a middleware of our one that would save the username from cookie and add it to the response body.
// We will be able to use that username from response body from other pages.
app.use((request, response, next) => {
    console.log(request.cookies);
    const { username } = request.cookies;
    response.locals.username = username;
    next();
})

app.use(methodOverride((request, response) => {
    if (request.body._method) {
        const method = request.body._method;
        delete request.body._method;
        return method;
    }
}))

//more information: http://expressjs.com/en/5x/api.html#app.settings.table
app.set("view engine", "ejs");

// app.set("views","pages")


app.get("/", (request, response) => {
    // response.send("<h2>Welcome to the express app!</h2>")
    response.render("welcome");
})

app.get("/hello_world", (request, response) => {
    response.send("<h2>Hello world!</h2>")
})

app.get("/survey", (request, response) => {
    response.render("survey");
})

app.get("/thank_you", (request, response) => {

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
app.post("/sign_in", (request, response) => {
    const { username } = request.body; // uses middleware express.urlencoded => const username = request.body.username;
    response.cookie("username", username, { maxAge: maxAge }); // uses middleware cookieparser cookie("nameOfCookie", "valueOfCookie"); 
    response.redirect("/");
})

app.post("/sign_out", (request, response) => {
    response.clearCookie("username");
    response.redirect("/");
})

// ---------------POST ROUTER ACCESSING POST ROUTES--------------------------
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

const PORT = process.env.PORT || 3000;
const address = "localhost"; // alias for 127.0.0.1

app.listen(PORT, address, () => {
    console.log(`Server is running on http://${address}:${PORT}`);
})
