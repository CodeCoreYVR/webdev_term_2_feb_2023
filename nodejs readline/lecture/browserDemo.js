
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("> ");

rl.on("line", (input) => {
    if(input === "chrome") {
        console.log("That's right!");
        rl.close();
    }
    else {
        console.log("Incorrect answer, Try again.");
        rl.prompt();
    }
});

rl.on('close', () => {
    console.log("Closing the interface");
});

console.log("What is the name of the browser from google?");
rl.prompt();