const fs = require('fs');

fs.stat('myFile.txt', (err, stat) => {
    if(err) {
        console.error("Something went wrong!!!");
    }
    else {
        console.log(stat);
        if(stat.isDirectory())
        {
            console.log("It is a directory");
        }
        else if(stat.isFile())
        {
            console.log("It is a file");
        }
    }
});