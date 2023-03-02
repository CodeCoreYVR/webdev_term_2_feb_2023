const knex = require("../db/client");

const main = async () => {
  try {
    const rows = await knex("posts").where({ id: 1 }).update({
      title: "So many views at this post!",
      viewCount: 50000,
    });

    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
