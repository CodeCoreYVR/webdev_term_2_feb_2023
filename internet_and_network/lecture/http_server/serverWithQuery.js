
const http = require('http');
const url = require('url');


const server = http.createServer((request, response) => {
    const params = url.parse(request.url, true).query;

    response.writeHead(200, {"content-type": "text/html; charset=utf-8"});
    response.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Http Sever</title>
            </head>
            <body>
                <h1>
                    Hello ${params.name}! Your age is ${params.age}
                </h1>
                <p>This is paragraph</p>
            </body>
        </html>
    `);
    response.end();
})

server.listen(8080);
console.log("Listening localhost to port 8080");