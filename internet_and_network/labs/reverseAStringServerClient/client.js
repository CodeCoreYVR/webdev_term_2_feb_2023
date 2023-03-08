// Import the net and readline modules
const net = require('net');
const readline = require('readline');

// Set the port and host for the server that the client will connect to
const PORT = 3000;
const HOST = 'localhost';

// Create a new readline interface to read input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a new TCP client socket and connect to the server
const client = new net.Socket();
client.connect(PORT, HOST, () => {

  // Log a message when the connection is established
  console.log(`Connected to server at ${HOST}:${PORT}`);

  // Prompt the user to enter a string to reverse
  rl.question('Enter a string to reverse: ', (input) => {

    // Send the user's input to the server
    client.write(input);

    // Close the connection after sending the data
    client.end();
  });
});

// Set up a 'data' event listener for the client socket
client.on('data', (data) => {

  // Log the data received from the server
  console.log(`Server response: ${data}`);
});

// Set up a 'close' event listener for the client socket
client.on('close', () => {

  // Log a message when the connection is closed
  console.log('Connection closed');
});