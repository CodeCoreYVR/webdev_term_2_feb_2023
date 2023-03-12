
const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"content-type": "text/html; charset=utf-8"});
    response.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Http Sever</title>
            </head>
            <body>
                <h1>
                    Hello world!
                </h1>
                <p>This is paragraph</p>
            </body>
        </html>
    `);
    response.end();
})

server.listen(8080);
console.log("Listening localhost to port 8080");