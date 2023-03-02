const knex = require("../db/client");

const main = async () => {
  try {
    // WE can use whereRaw to write our where statement manually
    const result = await knex
      .select("*")
      .from("posts")
      // This is custom where statement with bindings
      .whereRaw(`"title" ilike ? AND "viewCount" > ?`, ["%ab%", 500])
      .limit(100);

    // The sql is same as from line bellow

    // const result2 = await knex
    //   .select("*")
    //   .from("posts")
    //   .where("title", "ilike", "%ab%")
    //   .where("viewCount", ">", 500)
    //   .limit(100)

    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
