// Import the net and readline modules
const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a new TCP client socket and connect to the server
const client = new net.Socket();

// Set the port and host for the server that the client will connect to
const PORT = 3000;
const HOST = 'localhost';

// Connect to the server
client.connect(PORT, HOST, () => {
  console.log('Connected to server');

  // Prompt the user to enter a comma delimited list of numbers
  rl.question('Enter comma delimited numbers: ', (input) => {
    // Send the input to the server
    client.write(input);

    // When the client receives data from the server, print it to the console
    client.on('data', (data) => {
      console.log(`Server response: ${data.toString()}`);
      // Close the client socket
      client.destroy();
    });
  });
});

// Set up a 'close' event listener for the client socket and logs a message when the connection is closed
client.on('close', () => {
  console.log('Connection closed');
});
