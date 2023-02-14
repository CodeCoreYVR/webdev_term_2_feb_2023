const fs = require("fs");
const [inputFile, outputFile] = process.argv.slice(2);
// This line is destructuring the process.argv array to get the input and output file names
// The input file name will be stored in the `inputFile` variable and the output file name will be stored in the `outputFile` variable

if (process.argv.length !== 4) {
	console.error("Incorrect number of arguments");
  // If the number of command line arguments provided is not 4, it will print an error message saying "Incorrect number of arguments"
} else {
  // This function takes in a word and returns its pig latin translation
  const translateToPigLatin = (word) => {
    word = word.toLowerCase();
    // The word is converted to lower case

    const vowels = "aeiou",
      firstLetter = word[0];
    // `vowels` is a string that contains all the vowels in lowercase
    // `firstLetter` is the first letter of the word

    let period;
    // The `period` variable will store a period (.) if the word ends with one

    word[word.length - 1] === '.' 
      ? (period = '.') && (word = word.slice(0, -1)) 
      : period = '';
    // If the last letter of the word is a period (.), it will store the period in the `period` variable and remove it from the word.
    // If the last letter of the word is not a period (.), the `period` variable will be an empty string.

    if (vowels.includes(firstLetter)) {
      return `${word}${"way"}${period}`;
      // If the first letter of the word is a vowel, it will return the word concatenated with "way" and the `period` variable.
    } else if (vowels.includes(word[1])) {
      return `${word.slice(1)}${firstLetter}${"ay"}${period}`;
      // If the second letter of the word is a vowel, it will return the word with the first letter removed and concatenated with the first letter, "ay", and the `period` variable.
    } else {
      return `${word.slice(2)}${firstLetter}${word[1]}${"ay"}${period}`;
      // If neither the first nor the second letter of the word is a vowel, it will return the word with the first two letters removed and concatenated with the first two letters, "ay", and the `period` variable.
    }
  };

  fs.readFile(inputFile, "utf-8", (err, data) => {
    if (err) throw err;
    // This line reads the input file using the `fs` module and specifies that the file should be read in utf-8 encoding
    // If there's an error reading the file, it will throw an error
    console.log(`\n     Translating into 🐷...\n\n\n\n`);

    // const words = data.split(" ");
    // Split the contents of the file into an array of words

    // const translatedWords = words.map(word => translateToPigLatin(word)).join(' ');
    // Translate each word in the array using the translateToPigLatin function

    // const translatedText = translatedWords.join(" ");
    // Join the translated words back into a string with spaces

    const translatedText = data.split(' ').map(translateToPigLatin).join(' ');

    fs.writeFile(outputFile, translatedText, (err) => {
      // Write the translated text to the output file
      if (err) throw err;
      console.log(`"${inputFile}" translated into pig latin!`);
    });
  });
};