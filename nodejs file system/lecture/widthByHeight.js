const fs = require('fs');

const width = process.argv[2];
const height = process.argv[3];

let fileName = width + "_by_" + height;
let data = '';

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        data += '*';   
    }
    data += '\r\n';
}

fs.writeFile(fileName, data, err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Wrote ' + fileName + ' to disk...');
    }
})