
const knex = require("./db/client");

// const query = knex
//     .insert({
//         title: "Top 10 bugs",
//         content: "Spider, Ant, Moth etc."
//     })
//     .into("posts")
//     .then(res => {
//         console.log(res);
//         knex.destroy();
//     })
//     .catch(console.error);



const query2 = knex
    .insert([
        {
            title: "Alphabets",
            content: "A, B, C, D, E"
        },
        {
            title: "Top 5 Schools", 
            content: "Hogwarts, Codecore, Loma Linda, etc."
        },
        {
            title: "Top 3 Rocks", 
            content: "Diamond, Ruby, amethyst."
        }
    ])
    .into("posts")
    .then(res => {
        console.log(res);
        knex.destroy();
    })
    .catch(console.error);