// Import the net module to create a TCP server
const net = require('net');

// Create a new server instance
const server = net.createServer((socket) => {

  // Set up a 'data' event listener for the socket
  socket.on('data', (data) => {

    // Convert the data received from the client into a string and reverse it
    const reversed = data.toString().split('').reverse().join('');

    // Send the reversed string back to the client
    socket.write(reversed);
  });
});

// Set the port and host that the server will listen on
const PORT = 3000;
const HOST = 'localhost';

// Start the server and listen for incoming connections
server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});