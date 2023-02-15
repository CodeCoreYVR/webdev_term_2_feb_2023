const fs = require('fs');
const util = require('util');

// Promisify the fs.readFile and fs.writeFile methods
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);

// Read the contents of every file in the directory, combine the content into a single string, and write the string to another file.
async function combineFiles() {
  try {
    console.log('Reading file names...');
    // Read the names of all the files in the directory
    const files = await readDir('./files');

    // Use Promise.all to read the contents of every file
    const contents = await Promise.all(
      files.map(async (filename) => {
        // Read the contents of the file
        const data = await readFile(`./files/${filename}`, 'utf8');
        return data;
      })
    );
    console.log('Contents:', contents);

    // Combine the contents of all the files into a single string
    const combinedContent = contents.join('\n');

    // Write the combined content to a new file
    console.log('Writing combined content to file...');
    await writeFile('./combined_files.txt', combinedContent);
    console.log('Successfully combined files!');
  } catch (err) {
    console.error('Error combining files:', err);
  }
}

// ------------------------ or without util.promisify() ------------------------

// Read the contents of a file and return a promise
function readFile2(filename, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Write data to a file and return a promise
function writeFile2(filename, data, options) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Read the names of all the files in a directory and return a promise
function readDir2(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// Read the contents of every file in the directory, combine the content into a single string, and write the string to another file.
async function combineFiles2() {
  try {
    // Read the names of all the files in the directory
    console.log('Reading file names 2...');
    const files = await readDir2('./files');

    // Use Promise.all to read the contents of every file
    console.log('Reading file contents 2...');
    const contents = await Promise.all(
      files.map(async (filename) => {
        // Read the contents of the file
        const data = await readFile2(`./files/${filename}`, 'utf8');
        return data;
      })
    );
    console.log('Contents 2:', contents);

    // Combine the contents of all the files into a single string
    console.log('Combining file contents 2...');
    const combinedContent = contents.join('\n');

    // Write the combined content to a new file
    console.log('Writing combined content to file 2...');
    await writeFile2('./combined_files2.txt', combinedContent, 'utf8');
    console.log('Successfully combined files 2!');
  } catch (err) {
    // Handle any errors that occur
    console.error('Error combining files 2:', err);
  }
}

// Call the combineFiles function to start the process
combineFiles();
combineFiles2();





// [Lab] File Operations in dwquence

// Create a collection of text files inside this lab directory and perform the following tasks:

//   1.  Using a promisified fs.readFile, fs.writeFile and fs.readdir from the previous lab, 
//       read the contents of every file in the directory.
//   2.  Then, combine that content into a single string.
//   3.  Write the string to another file.

