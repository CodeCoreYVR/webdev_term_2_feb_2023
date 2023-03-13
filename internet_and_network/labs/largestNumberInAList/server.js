// Import the net module to create a TCP server
const net = require('net');

// Create a new server instance
const server = net.createServer((socket) => {
  console.log('Client connected');

  // Set up a 'data' event listener for the socket
  socket.on('data', (data) => {
    // Convert the incoming data to an array of numbers
    const numbers = data.toString().trim().split(',');
    // Find the maximum number in the array
    const max = Math.max(...numbers);

    console.log(`Received: ${numbers}`);
    console.log(`Max: ${max}`);

    // Send the maximum number back to the client
    socket.write(max.toString());
  });

  // This code sets up a listener for the end event on the socket object. When the end event is emitted, the callback function is called, which simply logs a message to the console indicating that the client has disconnected.
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Set the port and host that the server will listen on
const PORT = 3000;
const HOST = 'localhost';

// Start the server listening on the specified port and host
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});