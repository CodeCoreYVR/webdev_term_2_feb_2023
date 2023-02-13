const fs = require('fs');

fs.readdir('./', (err, data) => {
    if(err) {
        console.error("Something went wrong!!!");
    }
    else {
        console.log(data);
    }
})

console.log("I will be logged first");