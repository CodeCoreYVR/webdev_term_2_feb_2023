const fs = require('fs');

const text = "This text will be written in myFile.txt";

fs.writeFile('myFile.txt', text, err => {
    if(err) console.error("Error");
    else {
        console.log("File created");
    }
})