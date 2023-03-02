const knex = require("../db/client");

// We have to wrap our code in async function if we want to use await
const main = async () => {
  try {
    // To add new post to our posts table
    // We have to call insert function on our client
    // It takes an array of objects or just a single object
    // And the we specify into wich table we want to insert this
    // new post
    // and if we call returning we can specify which fields of
    // our object we want to get back
    // So we can get id of our created post
    const post = await knex
      .insert({
        title: "My second post",
        text: "This is sample text of my post",
        author: "Ondrej Belza",
        viewCount: 0,
      })
      // name of our table
      .into("posts")
      // Columns of row which we inserted that we want to get back
      .returning("*");
    console.log(post);
  } catch (error) {
    // Log error
    console.error(error);
  } finally {
    // Close connection
    knex.destroy();
  }
};

main().catch(console.error);
