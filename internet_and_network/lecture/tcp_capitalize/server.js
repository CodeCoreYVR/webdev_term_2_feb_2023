
const net = require("net");

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        data = data.toString().toUpperCase();
        socket.write("Hello " + data);
    })
    .on("error", (err) => {
        console.error(err);
        socket.write("Something went wrong!");
    });
});

server.listen(5000, "127.0.0.1",2,() => {
    console.log("Server is running on localhost 5000");
});