const knex = require("../db/client");

// If we want to use async await/catch we have to wrap our code
// in async function
const main = async () => {
  // If we are using await we should wrap our code in try catch block
  try {
    // To get data we have to use await
    // Await will block following code from execution until
    // we will get data from server
    const data = await knex
      .select("title", "author", "viewCount", "text")
      .from("posts")
      // We can use this similarly to sql
      .where("title", "ilike", "%ab%")
      .where("viewCount", "<", 500)
      // Limit to ten results
      .limit(10)
      // To ignore first ten results
      // Use for pagination
      .offset(10);
    // Then we can console log the output
    console.log(data);
  } catch (error) {
    // If we will get an error in try block it will stop executing try block
    // And it will start executing the catch block
    // And the error will be passed from try block
    // In the catch block we usually handle the error
    // Or at least console log it
    console.error(error);
  } finally {
    // Everything in this block will be executed
    // after our code in catch or try block
    // So for example we can close our connection to server
    // So we are able to close our cli app

    // client.destroy() will close connection to db
    knex.destroy();
  }

  // This is the same code but using .then .catch
  // client
  //   .select("title", "author")
  //   .from("posts")
  //   .then((data) => {
  //     console.log(data); // This will print result of our query
  //     client.destroy(); // To close connection to database
  //   });
};
main().catch(console.error);
