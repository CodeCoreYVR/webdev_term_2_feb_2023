
const net = require("net");
const { stdin, stdout } = require("process");
const rl = require("readline");

const interface = rl.createInterface({
    input: stdin,
    output: stdout
})

const client = new net.Socket();

const addName = () => {
    interface.question("name >", (input) => {
        if (input.includes("exit")) {
            client.end();
            process.exit();
        }
        client.write(input);
    })
}

client.on("data", function(data) {
    console.log("Data received from server:" + data);
    addName();
});

client.connect(5000, "127.0.0.1", function() {
    addName();
})