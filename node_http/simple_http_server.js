const urlMod = require('url');
const http = require('http');
const fs = require('fs/promises');
const queryString = require('node:querystring');

/**
 * Current Routes:
 * GET /welcome
 * GET /contact
 * POST /thank_you
 **/

const server = http.createServer((req, res) => { 

    const url = req.url.split('?')[0] // queries start after the ? so we can parse the URL by splitting at the ?
    req.query = urlMod.parse(req.url, true).query // we save the query onto the `req.query` property

    const resource = `${req.method} ${url}`
    console.log(resource)

    req.body = ''
    req.on('data', (chunk) => {
        req.body += chunk // chunk is the buffer of data coming in from HTTP request. This is always in the form of a string
    })

    req.on('end', ()=>{
        console.log(req.body)
        req.body = queryString.parse(req.body)

        if (url.includes(".")) {
            const fn = url.split("/")[1];
            console.log(fn);
            fs.readFile(fn, { encoding: 'utf-8' })
                .then(data => {
                    console.log(data);
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.write(data);
                    res.end();
                })
                .catch(console.error)
        }

        if (resource === 'GET /') { 
            res.writeHead(200, { 'content-type': 'text/html' });
            
            res.write(`
                <head>
                    <link rel="stylesheet" type="text/css" href="/style.css">
                </head>
                    <main> <h1>Welcome to Our App!</h1>
                </main>
            `)
            return res.end();
        }
        if (resource === 'GET /contact_us') {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(
                `
                <main>
                <h1>Contact us</h1>
                    <form action='thank_you' METHOD='POST'>
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

        if (resource === "POST /thank_you") {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(`
            <main>
                <h1>Thank you ${req.body.firstname}</h1>
                <h3>For your Questions:</h3>
                <p>${req.body.question}</p>
            </main>
            `)
            return res.end();
        }

        else {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.write(`
            <main>
                <h1>No Request Found</h1>
            </main>
            `)
            return res.end();
        }
    })
});

const PORT = 3000;
const DOMAIN = 'localhost'
server.listen(PORT, DOMAIN, () => {
    console.log('server listening')
})
