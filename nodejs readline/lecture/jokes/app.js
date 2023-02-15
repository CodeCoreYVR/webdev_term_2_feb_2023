// This will import my function from utils folder
const { loadJokes } = require("./jokesLoader");
// This will import readline module
const readline = require("readline");

// We have to crate new interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// This will return random number between minimum and maximum
const getRandomNumber = (minimum, maximum) => {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

// This will be our user prompt which we will display every time we ask user
const prompt = `What you want to do?
    -t -> tell a joke
    -q -> quit
    > `;

// We will set the prompt message
rl.setPrompt(prompt);
// we will display the prompt message
rl.prompt();

const main2 = async () => {
    // We will load array of jokes from our file
    loadJokes().then((jokes) => {

        rl.on("line", (input) => {
            // We will trim white spaces from our input
            input = input.trim();
            // If user wants to quit app we will close our cli app
            if (input === "-q") {
                rl.close();
            }
            // Otherwise we will display joke to the user
            else if (input === "-t") {
                // We start with getting random index between 0 and length of the array of jokes
                const randomIndex = getRandomNumber(0, jokes.length - 1);
                // Then based on that index we will get random joke
                const randomJoke = jokes[randomIndex];
                // then we will display empty line
                console.log("");
                // Setup for the joke
                console.log(randomJoke.setup);
                // And the the joke
                console.log(randomJoke.punchline);
                console.log("");
                // And after that we will prompt our user for next input
                rl.prompt();
            } else {
                // If users input is incorrect we will show the prompt again
                rl.prompt();
            }
        });
    })
    .catch(err => {
        console.log(err);
    });
};

main2().catch((err) => console.error(err));