
const net = require("net");

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        console.log("Data received on server from client:" + data);
        socket.write("Roger, " + data);
    });
});

server.listen(5000, "127.0.0.1");