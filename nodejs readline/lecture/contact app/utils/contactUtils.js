const fs = require("fs/promises");

// This function will load data from our .csv file
// It will convert it into an array of objects and return that value
const getAllContacts = () =>
  // We start with returning new Promise
  new Promise((resolve, reject) => {
    // Then we load data from our file
    fs.readFile("./data/contacts.csv", { encoding: "utf-8" })
      .then((data) => {
        const formattedData = data
          // We split data into rows
          .split("\n") // ['name,email', 'Ondrej,example@example.com', 'newUser,email@email.com' ] => this result after this line
          .slice(1) // We will remove our header values ['Ondrej,example@example.com', 'newUser,email@email.com' ]
          .map((row) => row.split(",")) // This will map into an array of arrays [['Ondrej','example@example.com'], ['newUser','email@email.com'] ];s
          // This will crate an array of object from our array of arrays
          // [{name: "Ondrej", email: "example@example.com"}, {name: 'newUser', email: ''email@email.com}]
          .map((entry) => ({ name: entry[0], email: entry[1] }));
        // Then we will resolve our promise with mapped data
        resolve(formattedData);
      })
      // And if we get an error we will reject our promise with the error
      .catch((err) => reject(err));
  });

// This function will handle adding new contact to our file
// It takes an contact object as an argument
// Structure of contact object should be like {name: "",email: ""}
const addContact = (contact) =>
  // We will return new promise
  new Promise((resolve, reject) => {
    //We will call fs.appendFile to append new contact at the end of the current file
    fs.appendFile("./data/contacts.csv", `\n${contact.name},${contact.email}`)
      // If text was appended we will resolve our promise
      .then(() => resolve())
      // Else we will reject our promise with an error
      .catch((err) => reject(err));
  });

// This function is deleting our contact from our file
// This takes email that should be deleted as an argument
const removeContact = (emailContact) =>
  // We start with returning a new promise
  new Promise((resolve, reject) => {
    // We specify path to our file
    // We specify encoding of our file
    fs.readFile("./data/contacts.csv", { encoding: "utf-8" })
      // This .then will be called once we load the content of our file
      .then((data) => {
        const newData = data
          // We will split content into rows ['','','']
          .split("\n")
          // We will split rows into an array of values
          // [['','']]
          .map((row) => row.split(","))
          //Then we will filter the contacts and delete every contact will this email
          .filter((contact, index) => {
            // This line will prevent us from deleting our header in .csv file
            if (index === 0) return true;
            else {
              // If this condition is true contact will be kept otherwise it will be deleted
              return contact[1] !== emailContact;
            }
          });
        // After we map our contacts we will write the new array of contacts to our file
        return fs.writeFile(
          "./data/contacts.csv",
          // This will map it into string from an array of arrays
          newData.map((row) => row.join(",")).join("\n")
        );
      })
      // After that we will resolve our promise
      .then(() => resolve())
      // If some error will occur we will reject our promise with this error
      .catch((err) => reject(err));
  });

// We have to export our function so we are able to access them in other files
module.exports.getAllContacts = getAllContacts;
module.exports.addContact = addContact;
module.exports.removeContact = removeContact;