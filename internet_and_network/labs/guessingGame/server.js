// Import the net module to create a TCP server
const net = require('net');

// Create a server object that listens for connections
const server = net.createServer((socket) => {
  console.log('Client connected');

  // Generate a random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  // Initialize a counter for the number of attempts
  let attempts = 0;

  // Write a message to the client requesting a guess
  socket.write('Guess a number between 1 and 100: ');

  // Listen for data events from the client, which occur when the client sends data
  socket.on('data', (data) => {
    // Convert the data received from the client to a number and trim any whitespace
    const guess = Number(data.toString().trim());
    // Increment the number of attempts
    attempts++;

    // Check if the guess is correct, and if so, send a response and close the connection
    if (guess === randomNumber) {
      // socket.write(information) sends data to the client.js, client is listening for a data even with client.on('data', (data) => {
      // socket.write(`You guessed right in ${attempts} attempt(s)`);
      // socket.end();
      // Line 26 & 27 same as line 29
      socket.end(`You guessed right in ${attempts} attempt(s)`);
    } else if (guess > randomNumber) { // If the guess is too high, send a hint to the client
      // socket.write('Guess lower: ') sends data to the client.js, client is listening for a data even with client.on('data', (data) => {
      socket.write('Guess lower: ');
    } else { // If the guess is too low, send a hint to the client
      // socket.write('Guess higher: ') sends data to the client.js, client is listening for a data even with client.on('data', (data) => {
      socket.write('Guess higher: ');
    }
  });

  // Listen for close events from the client, which occur when the client disconnects
  socket.on('end', () => {
    console.log('Client disconnected');
    // This is not neccessary, however, it's good practice just in case something prevented socket.end and client.destroy from gracefully closing the socket 
    socket.destroy();
  });
});

// Set the port and host that the server will listen on
const PORT = 3000;
const HOST = 'localhost';

// Start the server listening on the specified port and host
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
