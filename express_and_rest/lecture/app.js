
const cookieParser = require('cookie-parser');
const express = require('express');
const log = require('morgan');
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');

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


// Set Session for user
app.use(session({
    name: "user", // The name of the cookie to be used

    // "Secret" is a string (signature) that signs a cookie. This allows us to verify that
    // the cookie coming back from the client was issued by the server, and not modified by the client.
    secret: "super_secret_key_for_session",
    
    saveUninitialized: false,

    resave: false, // Doesn't need to resave session on server if it was not modified

    // by default it is true. But if we are not using https, it could be false.
    cookie: {secure: false}
}))

// Write a middleware of our one that would save the username from cookie and add it to the response body.
// We will be able to use that username from response body from other pages.
app.use((request, response, next) => {
    // console.log(request.cookies);
    // const { username } = request.cookies;

    console.log(request.session);
    const { user, alert } = request.session; 

    response.locals.username = user && user.username; // => user ? user.username : undefined;
    response.locals.alert = alert
    delete request.session.alert
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

// ----------User Routes
const userRouter = require('./routes/users')
app.use('/users', userRouter);

// -----------Root Routes---------
const rootRouter = require('./routes/root')
app.use('/', rootRouter);

// ---------------POST ROUTER ACCESSING POST ROUTES--------------------------
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

const sessionRouter = require('./routes/session')
app.use('/session', sessionRouter)

const PORT = process.env.PORT || 3000;
const address = "localhost"; // alias for 127.0.0.1

app.listen(PORT, address, () => {
    console.log(`Server is running on http://${address}:${PORT}`);
})
