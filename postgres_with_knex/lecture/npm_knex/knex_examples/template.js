const knex = require("../db/client");

const main = async () => {
  try {
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
