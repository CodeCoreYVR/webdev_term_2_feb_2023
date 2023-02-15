// Import fs module
const fs = require("fs/promises");

// function for loading jokes from file
const loadJokes = () =>
  new Promise((resolve, reject) => {
    // We will load content fo ./jokes.json file
    fs.readFile("./jokes.json", { encoding: "utf-8" })
      .then((data) => {
        // This is an json but we want convert it to js array of object
        // So we have to call JSON.parse() with the json as a text as argument
        const arrayOfJokes = JSON.parse(data);
        // Then we resolve the promise with array of jokes
        resolve(arrayOfJokes);
      })
      // If this fails we will reject the promise with an error
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

const deleteJokes = () => {
  //Todo
}
// And we have to export our function
module.exports.loadJokes = loadJokes;
module.exports.deleteJokes = deleteJokes;
