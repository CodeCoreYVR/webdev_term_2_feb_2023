const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

generateRectangle = (width, height) => {
  let data = '';

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      data += '*';
    }
    data += '\r\n';
  }
  return data;
};

rl.question('What is the width of rectangle?\n', (width) => {
  rl.question('What is the height of rectangle?\n', (height) => {
    rl.question('What is the file name?\n', (fileName) => {
      let data = generateRectangle(width, height);
      fs.writeFile(fileName, data, (err) => {
        if (err) {
          console.log('Something went wrong!');
        } else {
          console.log('A file created successfully!');
          rl.close();
        }
      });
    });
  });
});