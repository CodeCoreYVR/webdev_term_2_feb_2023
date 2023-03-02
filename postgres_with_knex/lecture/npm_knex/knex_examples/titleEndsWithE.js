const knex = require("../db/client");

const main = async () => {
  try {
    const posts = await knex
      .select("*")
      .from("posts")
      .where("title", "ilike", "%e.");

    console.log(posts);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
