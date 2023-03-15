
const express = require('express');
const log = require('morgan');

// Requiring the "express" package returns a function that creates
// an instance of the express application. More info here:
// http://expressjs.com/en/4x/api.html
const app = express();

//app is using the Morgan middleware/plugin to log http response and request.
app.use(log(':method :url :status :res[content-length] - :response-time ms'));

//more information: http://expressjs.com/en/5x/api.html#app.settings.table
app.set("view engine", "ejs");

// app.set("views","pages")


app.get("/", (req, res) => {
    // response.send("<h2>Welcome to the express app!</h2>")
    res.render("welcome");
})

app.get("/hello_world", (req, res) => {
    res.send("<h2>Hello world!</h2>")
})

app.get("/survey", (req, res) => {
    res.render("survey");
})

app.get("/thank_you", (req, res)=> {
    console.log(req.query);

    let { name, hobby, pet, javascript, c, ruby } = req.query;

    res.render("thank_you", {
        name, //name: name
        hobby,
        javascript: javascript || "",
        c: c || "",
        ruby: ruby || "",
        pet
    });
})

const PORT = process.env.PORT || 3000;
const address = "localhost"; // alias for 127.0.0.1

app.listen(PORT, address, () => {
    console.log(`Server is running on http://${address}:${PORT}`);
})
