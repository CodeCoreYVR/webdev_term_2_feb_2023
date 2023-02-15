// We will import the build-in node module readline
const readline = require("readline");
// We will import our functions form our utils file
const {
  getAllContacts,
  addContact,
  removeContact,
} = require("./utils/contactUtils");

// We have to crate new Interface for our CLI
const rl = readline.createInterface({
  // Input is process.stdin = user input
  input: process.stdin,
  // Output is where we will display everything from our CLI app
  output: process.stdout,
});

// This is our default message that we will show our user
// When we are asking what he wants to do
// -l is for listing our contacts
// -a is for adding new contact
// -d is for deleting one ore more of our contacts
const defaultMessage = `What you want to do?
  -l -> List all contacts
  -a -> add new user
  -d -> deleting contact
  -c -> closing app
  > `;

// Set prompt will override the default message
rl.setPrompt(defaultMessage);
// This will display our prompt in the terminal
rl.prompt();
// We are listening to rl line event and when this event
// is fired we will check if it is one of our options
rl.on("line", (input) => {
  // We will remove whitespaces from start and end of our string
  input = input.trim();
  // This will be true if user wants to list all contacts
  if (input === "-l") {
    // We will call our method from our utils file
    getAllContacts().then((contacts) => {
      // And we will display result in the terminal
      console.log("This is list of your contacts");
      console.log(contacts);

      // We set the prompt to our default message
      rl.setPrompt(defaultMessage);
      // Then we will display the prompt
      rl.prompt();
    });
  }
  // This will be true if user wants to close the app
  else if (input === "-c") {
    // This will close our app
    rl.close();
  }
  // This will be true if user wants to add new contact
  else if (input === "-a") {
    // We will ask user for the new contact name
    rl.question("What is this contact name?\n> ", (name) => {
      // We will display the user input
      console.log("Name is ", name);
      // And we will ask for contact email
      rl.question("What is this contact email?\n> ", (email) => {
        // We will display the email which user entered
        console.log("Email is", email);
        // Then we will call our method for adding new contact
        // And we will pass in an object with keys name and email
        addContact({ name, email }).then(() => {
          // When contact is added we will reset our prompt
          rl.setPrompt(defaultMessage);
          // We will show our prompt
          rl.prompt();
        });
      });
    });
  }
  // This will be true if user wants do delete contact
  else if (input === "-d") {
    // We will ask user for contact which he wants to delete
    rl.question("Email of the user which you want to delete?\n> ", (answer) => {
      // We will call our method for removing contact
      removeContact(answer).then(() => {
        // After that we will reset our prompt
        rl.setPrompt(defaultMessage);
        // We will show the default message prompt
        rl.prompt();
      });
    });
  }
  //This will be true if user entered wrong command
  else {
    // We will set new prompt will Error message and options what he can do
    rl.setPrompt("Invalid input try again!\n" + defaultMessage);
    // We will show the prompt to the user
    rl.prompt();
  }
});

// rl will fire event close when the app is closed
// So we can display goodbye message
rl.on("close", () => {
  // We will console.log our goodbye message
  console.log(
    "Thanks for using this app. Your contacts will be stored in file."
  );
});