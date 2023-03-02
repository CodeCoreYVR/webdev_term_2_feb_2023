const knex = require("../db/client");

const main = async () => {
  try {
    const res = await knex("posts").where("id", 1011).del();
    console.log(res);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
