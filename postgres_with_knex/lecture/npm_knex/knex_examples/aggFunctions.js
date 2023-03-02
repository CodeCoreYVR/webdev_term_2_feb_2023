const knex = require("../db/client");

const main = async () => {
  try {
    // This is example of avg function
    const avg = await knex
      .avg("viewCount as avgViewCount")
      .max("viewCount as maxViewCount")
      .min("viewCount as minViewCount")
      .from("posts");
    console.log(avg);
  } catch (error) {
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
