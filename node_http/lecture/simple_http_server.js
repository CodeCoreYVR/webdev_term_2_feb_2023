const urlMod = require('url');
const http = require('http');
const fs = require('fs/promises');

const server = http.createServer((req, res) => { 

    const url = req.url.split('?')[0];
    const params = urlMod.parse(req.url, true).query;

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

    if (url === '/') { 
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
            <h1>Thank you ${params.firstname}</h1>
            <h3>For your Questions:</h3>
            <p>${params.question}</p>
        </main>
        `)
        return res.end();
    }
});

const PORT = 3000;
const DOMAIN = 'localhost'
server.listen(PORT, DOMAIN, () => {
    console.log('server listening')
})
