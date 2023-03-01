/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const faker = require("faker");

exports.seed = async function(knex) {
  // Deletes ALL existing entries

  let posts = Array.from({length: 1000}).map(() => {
    return {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      viewCount: faker.random.number(10)
    }
  })

  await knex('posts').del()
  // await knex('posts').insert([
  //   {title: "Good morning", content: 'lets have a walk and then a cup of tea'},
  //   {title: "Snowing", content: 'It is snowing for last several days'},
  //   {title: "Raining", content: 'Rain, rain go away, come again another day'},
  // ]);
  await knex('posts').insert(posts);
};
