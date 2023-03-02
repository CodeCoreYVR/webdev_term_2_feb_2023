const knex = require("../db/client");

const main = async () => {
  try {
    const results = await knex
      .select("*")
      .from("posts")
      .innerJoin("comments", "posts.id", "comments.post_id");

    console.log(results);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
