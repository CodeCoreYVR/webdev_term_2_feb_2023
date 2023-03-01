
const knex = require("./db/client");

const queryPromise = knex
    // .select("*")
    .select("id", "title")
    .from("posts")
    .limit(5)
    .offset(10)
    // .whereRaw(`"createdAt" > now() - interval '2 days'`);

console.log(queryPromise.toSQL().sql);

queryPromise
    .then(data => {
        console.log(data);
        knex.destroy();
    })
    .catch(console.error);