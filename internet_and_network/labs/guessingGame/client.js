// Import the net and readline modules
const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a new TCP client socket and connect to the server
const client = new net.Socket();

// Set the port and host for the server that the client will connect to
const PORT = 3000;
const HOST = 'localhost';

// Connect to the server
client.connect(PORT, HOST, () => {
  console.log('Connected to server');

  // Ask the user to enter a guess and send it to the server
  rl.question('Guess a number between 1 and 100:\n> ', (guess) => {
    // client.write(guess) sends data to the server.js, server is listening for a data even with socket.on('data', (data) => {
    client.write(guess);
  });
});

// Listen for data events from the server, which occur when the server sends data through socket.write(information)
client.on('data', (data) => {
  // Prompt the user for the next guess and send it to the server
  rl.question(`${data.toString()}\n> `, (guess) => {
    // client.write(guess) sends data to the server.js, server is listening for a data even with socket.on('data', (data) => {
    client.write(guess);
  });
});

// Listen for end events from the server, which occur when the server closes the connection with // Listen for data events from the server, which occur when the server sends data through socket.end()
client.on('close', () => {
  console.log('Connection closed');
  // closes the readline session
  rl.close();
  // This is not neccessary, however, it's good practice just in case something prevented socket.end from gracefully closing the socket
  client.destroy();
});
