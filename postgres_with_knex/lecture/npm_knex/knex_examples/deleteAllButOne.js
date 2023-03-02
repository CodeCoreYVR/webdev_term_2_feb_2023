const knex = require("../db/client");

const main = async () => {
  try {
    const firstId = await knex.select("id").from("posts").limit(1);
    console.log(firstId);
    const delResult = await knex("posts")
      .where("id", "not in", [firstId[0].id])
      .del();
    console.log(delResult);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
