const knex = require("../db/client");

const main = async () => {
  try {
    // posts from last two months
    // We will get current data
    const now = new Date();
    // We set month to two months ago
    // But this will return timestamp instead of date
    // So we have to format it again
    const twoMonthsBefore = new Date(now.setMonth(now.getMonth() - 2));

    const posts = await knex
      .select("*")
      .from("posts")
      .where("createdAt", ">", twoMonthsBefore)
      .orderBy("createdAt", "DESC");

    console.log(posts);
  } catch (error) {
    console.error(error);
  } finally {
    knex.destroy();
  }
};

main().catch(console.error);
