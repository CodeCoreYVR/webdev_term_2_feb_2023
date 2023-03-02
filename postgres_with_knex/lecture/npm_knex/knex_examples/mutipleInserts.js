const knex = require("../db/client");

// We have to wrap our code in async function
// if we want to use await
const main = async () => {
  try {
    // We will start with empty array of new posts
    const listOfPosts = [];
    // then we will create new for loop
    // With condition index < 5
    // which means that this loop will run 5 times
    for (let index = 0; index < 5; index++) {
      // In each run we will and new object into our list of posts
      listOfPosts.push({
        title: `My post from multiple insert file no. ${index + 1}`,
        text: `This is sample text of my post no ${index + 1}`,
        author: "Ondrej Belza",
        viewCount: 0,
      });
    }

    // After we fill data in our array
    // We can start adding values to our db

    const insertedPosts = await knex
      //Insert takes array of objects or object as an argument
      // and it should hold the values that we want to add to our db
      .insert(listOfPosts)
      // name of our table
      .into("posts")
      // we want to get all columns of our new posts back with id's
      .returning("*");

    // Then we log our new posts
    console.log(insertedPosts);
  } catch (error) {
    // If we have an error we will log the error
    console.error(error);
  } finally {
    // Finally we will close connection to the db
    knex.destroy();
  }
};

// We have to call our function
main().catch(console.error);
