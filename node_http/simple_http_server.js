const http = require('http');
const urlParse = require('url');

const server = http.createServer((req, res) => {

    const url = req.url.split("?")[0]; //thank_you?name=Value1&quesiton=Value2

    res.writeHead(200, { 'content-type': 'text/html' }); // not text/html

    if (req.url === "/contact_us") {
        res.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Http Sever</title>
            </head>
            <body>
                <form action="/thank_you">
                <label>Name</label>
                <input 
                    type="text"
                    name="name"
                />
                <br/>
                <label>Question</label>
                <input 
                    type="text"
                    name="question"
                />
                <input type="submit" value="Subit form"/>
                </form>
            </body>
        </html>
        `);
        return res.end();
    }
    else if (url === "/thank_you") {
        const params = urlParse.parse(req.url, true).query;
        res.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Http Sever</title>
            </head>
            <body>
                <h1>
                Hello ${params.name}
                </h1>
                <p>
                Your question was ${params.question}
                </p>
            </body>
        </html>
        `);
        return res.end();
    }
    else {
        res.write("<h1>Welcome to my site!</h1>");
        return res.end();
    }

});

const port = 3000;
const domain = 'localhost';

server.listen(port, domain, () => {
    console.log("Server Listening at " + domain + ":" + port);
})

