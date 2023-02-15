const fs = require('fs');

// This function takes a file path and data to write to the file, and returns a Promise
// that resolves when the file has been successfully written, or rejects if there's an error.
const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    // Call the fs.writeFile method with the given path and data
    fs.writeFile(path, data, (err) => {
      err ? reject(err) : resolve(); // same as below code
      // // If there's an error, reject the Promise with the error object
      // if (err) {
      //   reject(err);
      // } else {
      // // If there's no error, resolve the Promise
      //   resolve();
      // }
    });
  });
}

writeFile("file.txt", "The contents of my file")
  .then(function () { console.log("File write complete!") })
  .catch(function (error) { console.error(error) });





// [Lab] Promisify fs.writeFile

// The asynchronous method writeFile of Node's fs module writes files. For example:
// fs.writeFile("file.txt", "My file contents!", function (err) {
//   if (err) throw err;
// });
// // creates a file named "file.txt" with the contents "My file contents!"

// Documentation for writeFile is available here.
// Take back control by writing a function writeFile that returns a promise
// which resolves when writing the file is complete or rejects if there's an error while 
// writing a file.

// Example usage:
// writeFile("file.txt", "The contents of my file")
//   .then(function () { console.log("File write complete!") })
//   .catch(function (error) { console.error(error) })
