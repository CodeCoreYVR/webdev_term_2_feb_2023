// Import the readline module to prompt the user for input
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// The placeholder character used for letters not yet guessed
const placeholder = '_';

// A string used to check if Guess is a letter
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// An array of possible words to guess from
const dictionary = [
  'JAVASCRIPT', 'PYTHON', 'HTML', 'CSS', 'ANGULAR',
  'REACT', 'VUE', 'PHP', 'RUBY', 'JAVA',
  'SWIFT', 'KOTLIN', 'OBJECTIVEC', 'MYSQL', 'MONGODB',
  'REDIS', 'POSTGRESQL', 'ELASTICSEARCH', 'DOCKER', 'KUBERNETES'
];

// The number of attempts remaining before the game is over
let remainingAttempts = 7;

// The word to guess
let word;

// The current state of the word being guessed
let displayWord;

// Choose a random word from the dictionary
function chooseWord() {
  word = dictionary[Math.floor(Math.random() * dictionary.length)];
  // Initialize the display word with the same number of underscores as letters in the chosen word
  displayWord = Array(word.length).fill(placeholder);
}

// Display the current state of the game
function displayHangman() {
  console.log(`Attempts Remaining: ${remainingAttempts}`);
  console.log(`${displayWord.join(' ')}`);
}

// Update the display word with the guessed letter at the given index
function updateDisplayWord(index, letter) {
  displayWord[index] = letter;
}

// Check if the guessed letter is in the word
function checkGuess(guess) {
  // Check if the guess is a single letter
  if (!alphabet.includes(guess) || guess.length !== 1) {
    console.log("Incorrect type of input or incorrect amount of letters guessed at a time");
    return;
  }
  
  // Initialize a variable to track whether the guessed letter was found in the word
  let found = false;
  
  // Check each letter of the word for the guessed letter
  for (i in word) {
    if (word[i].toUpperCase() === guess.toUpperCase()) {
      // If the guessed letter matches a letter in the word, update the display word and mark found as true
      found = true;
      updateDisplayWord(i, guess.toUpperCase());
    }
  }
  
  // Display a message indicating whether the guess was correct or not
  if (found) {
    console.log(`There was a ${guess.toUpperCase()}!`);
  } else {
    remainingAttempts--;
    console.log(`Sorry, no ${guess.toUpperCase()}.`);
  }
}

// Check if the game has been won or lost
function checkWin() {
  if (displayWord.join('') === word) {
    // If the display word matches the word being guessed, the game has been won
    console.log(`Congrats, you win! The word was ${word}!`);
    rl.close();
  } else if (remainingAttempts === 0) {
    // If there are no remaining attempts, the game has been lost
    console.log(`Game over! The word was ${word}`);
    rl.close();
  } else {
    // If the game is still ongoing, prompt the user for another guess
    promptGuess();
  }
}

// Prompt the user for a guess
function promptGuess() {
  displayHangman();
  rl.question('> ', (guess) => {
    checkGuess(guess.toUpperCase());
    checkWin();
  });
}

// Choose a random word and prompt for the first guess
chooseWord();
promptGuess();




// [Lab] Hangman

// Create a script, hangman.js, that plays the game of Hangman. When the user runs the script, 
// it should display placeholders for all the letters in the word. The user types a letter to 
// attempt a guess. If the letter is part of the word, the placeholder should update with the 
// guessed letter, and the user should then be prompted to guess again. End the game when the 
// word is complete.

// Here's a sample interaction with the script:
//   $ node hangman.js
//   _ _ _ _ 
//   > N
//   There was an N! N _ _ _
//   > S
//   Sorry, no S. N _ _ _
//   > E
//   There was an E! N _ _ E
//   > O
//   There was an O! N O _ E
//   > D
//   Congrats! The word was NODE

// Stretch
// Make the script case insensitive. N and n would be the same guess. Limit the number of attempts to 7.
