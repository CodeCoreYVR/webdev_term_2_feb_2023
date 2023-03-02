const knex = require("../db/client");

const main = async () => {
  try {
    const posts = await knex("posts").where("id", ">", "1995").update({
      title: "Sparkled!",
    });

    console.log(posts);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
