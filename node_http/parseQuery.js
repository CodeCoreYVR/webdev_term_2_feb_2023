const queryParser = require('./parseQuery');
const http = require('http');
const fs = require('fs/promises');

// https://nodejs.org/dist/latest-v12.x/docs/api/http.html
// Http is a protocol. they are the rules to send messages between client and server. HTTP and HTTPS, logically they are same the only difference between http and https is the 's' part. 
// 'S'👈🏻 This is for security. SSL certificate which we have / install on our web server.
// SSL Certificate, we have to pay extra or some site offers it for free.

// it was created for World Wide Web (WWW)

// Properties of HTTP Message:
/* 
Stateless: Meaning the current HTTP Message doesnot know any thing about hte precious or future message.
Abstracted: it works completely indpependent of a server / client. Because they are working on an application layer they dont care where they came form or where they are going from they only worry about how and and what to get there 
*/
// Anatomy of an HTTP message
// 1. It is a huge block of structured text
// This text consist of following things:
// 1. Start Line - (Request Line / Status line) - This is a very start of a HTTP message 
// Request line - This is a request from a client to a server
// Status Line- This kind of a response back to the client

// It also contains following things:
// 2. Header Field - It contains Meta-data of HTTP Message
// Extensible: You can create your own fields here
// 3. Message Body - Pay load / Actual page (data)

// HTTP Message Status Code
// List of all the status code is available here with description
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// They are three digit codes sent in an HTTP header

const server = http.createServer((req, res) => { // http.createServer is used to create a  server. It takes to arguments: 
    // 1. Options objects
    // 2. requestListener callback - is sometimes reffered as requestHandler. This takes 2 arguments:
    // request - req . This contains icoming information about HTTP request
    // response - res- This contains method used to create a HTTP response


    // url=req.url;
    const [url, query] = req.url.split('?')
    console.log(url);
    if (query) {
        // Using custom query parser to dparse the values
        req.query = queryParser(query); // we save the query onto the 'req.query' property

    }

    if (url.includes(".")) {
        const fn = url.split("/")[1];
        console.log(fn);
        fs.readFile(fn, {encoding: 'utf-8'})
            .then(data => {
                console.log(data);
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(data);
                res.end();
            })
    }

    console.log(req.query);
    if (url === '/welcome') {
        // if req.url has '/welcome' this part will be processed 
        res.writeHead(200, { 'content-type': 'text/html' });
        // We are teilling browser that we will be sending HTML data , and we changed the MIMIE type in the header from palin text to HTML
        res.write(`
        <head>
        <link rel="stylesheet" 
            type="text/css" href="/style.css">
        </head>
        <main> <h1>Welcome to Our App!</h1>
        <img src='https://media.giphy.com/media/3o84TQFMWmJX6avrPi/giphy.gif'
        </main>
        `)
        // 👆🏻 WE are sending HTML back to the user 
        return res.end(); // This make sure that request ends 
        //  We also make sure to add return statement after calling res.end() os that the function exit. If we dont do this node will keep processint after the if condition whihc we don't want.
    }
    if (url === '/contact_us') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(
            `
            <main>
            <h1>Contact us</h1>
                <form action='thank_you' >
                    Name:
                    <input type='text' name='firstname'/>
                    Question:
                    <input type='text' name='question'/>
                    <input type='submit' value='submit'/>
                </form>
            </main>
            `
        )
        return res.end();
    }
    if (url === "/thank_you") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(`
        <main>
            <h1>Thank you ${req.query.firstname}</h1>
            <h3>For your Questions:</h3>
            <p>${req.query.question}</p>
        </main>
        `)
        return res.end();
    }

    if (url === "/hello") {
        // Inside Request Listner- we are adoing several things 

        // 1. 👇🏻 We are writting an header to let browser / client  know what kind of the data they will be recieving
        res.writeHead(200, { 'content-type': 'text/plain' });

        //2. Writing the actual data to be revieved by the client. In our case it is just hello world 
        res.write("Hello World");
        // 3. Last thing we end the response. Every time  a client makes a request they are opening connections to our server. This connection should be closed when completed. This let the client to know that there is nothing more to come. if we do not add res.end() the request will hang.
        res.end();
    }
});

const PORT = 8080;
const DOMAIN = 'localhost'
// The http.createServer  function returns an object that has '.listen()' method. This method is to make the server actually start running and listening for the request sent by browser(client).  
// '.listen()' accepts 4 parameters
// Port: the port number for the server to run on 
// Domain: a domain name he server to run on (or ip address)
// backlog: a number that specifies the maximum length of ques of pending connection
// A callback: get invoked once the server is listening.
server.listen(PORT, DOMAIN, () => {
    console.log('server listening')
})
