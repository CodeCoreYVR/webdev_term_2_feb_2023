/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  const posts = Array.from({length: 1000}).map(() => {
    return {
      title: faker.company.name(),
      content: faker.lorem.paragraphs(),
      view_count: Math.floor(Math.random() * 100),
      created_at: faker.date.past(),
      image_url: faker.image.imageUrl()
    }
  })
  await knex('posts').insert(posts);
};
