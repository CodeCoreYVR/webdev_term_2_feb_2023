const cowsay = require("cowsay");



let opts = {
    text: "Hello from TypeScript!",
    e: '..',
    // r: true,
    y: true,
};

console.log(cowsay.say(opts));