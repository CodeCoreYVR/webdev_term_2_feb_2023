// Import the readline module for reading input from the user
const readline = require('readline');

// Create a readline interface to prompt the user for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define an array of questions and their corresponding answers
const questions = [
  {
    question: "What is the name of Google's browser?",
    answer: "Chrome"
  },
  {
    question: "What is the name of Apple's browser?",
    answer: "Safari"
  },
  {
    question: "What is the name of Mozilla's browser?",
    answer: "Firefox"
  },
  {
    question: "What is the name of Microsoft's browser?",
    answer: "Edge"
  },
  {
    question: "What is the name of the default browser on Android?",
    answer: "Chrome"
  },
  {
    question: "What is the name of the browser developed by Opera Software?",
    answer: "Opera"
  },
  {
    question: "What is the name of the web browser that was developed by Netscape Communications?",
    answer: "Netscape Navigator"
  },
  {
    question: "What is the name of the browser that is pre-installed on most Linux distributions?",
    answer: "Firefox"
  },
  {
    question: "What is the name of the browser developed by Maxthon?",
    answer: "Maxthon Cloud Browser"
  }
];

// Initialize a counter to keep track of the number of correct answers
let correctAnswers = 0;

// Shuffle the questions array randomly
const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

// Take the first 3 questions from the shuffled array
const selectedQuestions = shuffledQuestions.slice(0, 3);

// Define a recursive function to prompt the user for each question
const askQuestion = index => {
  if (index >= selectedQuestions.length) {
    // If this was the last question, show the final score and close the readline interface
    console.log(`Final score: ${correctAnswers} / ${selectedQuestions.length}`);
    rl.close();
  } else {
    // Otherwise, prompt the user for the next question
    rl.question(`${selectedQuestions[index].question}\n> `, (input) => {
      // Convert the questions answer to lowercase for case-insensitive matching
      let questionAnswer = selectedQuestions[index].answer.toLowerCase();
      // Convert the answer and correct answer to lowercase for case-insensitive matching
      input = input.toLocaleLowerCase();
      if (input === questionAnswer || questionAnswer.includes(`${input} `)) {
        // If the answer is correct, increment the counter and show a message
        console.log(`That's correct! ${selectedQuestions[index].answer}`);
        correctAnswers++;
      } else {
        // If the answer is incorrect, show the correct answer
        console.log(`${input} is incorrect. The answer was ${selectedQuestions[index].answer}.`);
      }

      // Ask the next question recursively
      askQuestion(index + 1);
    });
  }
}

// Start asking the first question
askQuestion(0);




// [Lab] Mini Quiz

// Create a script, miniQuiz.js, where a user answers a set of three questions. There should 
// only be one attempt per question, and after each answer the game should state whether the 
// answer was correct or not and proceed to prompt the user with the next question. At the 
// end of the quiz, the game should indicate how many questions the user answered correctly.

// Here's a sample interaction with the script:  
//   $ node miniQuiz.js
//   What is the name of Google's browser?
//   > Chrome
//   That's correct!
//   What is the name of Apple's browser?
//   > internet explorer
//   Internet Explorer is incorrect. The answer was Safari.
//   What is the name of Mozilla's browser?
//   > Firefox
//   That's correct!
//   Final score: 2 / 3