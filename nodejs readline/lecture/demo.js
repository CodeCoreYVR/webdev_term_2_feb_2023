
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("> ");

rl.on("line", (input) => {
    if (input === "wait") {
        rl.pause();
        console.log("3 sec to resume the interface...");

        setTimeout(()=> {
            rl.resume();
        }, 3000);
    }
    else {
        rl.prompt();
    }
});

rl.on("resume", () => {
    console.log("Resuming the interface");
});

rl.on("pause", () => {
    console.log("Pausing the Interface");
})

rl.prompt();