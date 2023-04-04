/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker')
const cowsay = require("cowsay")

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  const users = await knex("users").select("id")
  
  await Promise.all(users.map(async user => {
    const numberOfPosts = parseInt(faker.random.numeric(3))

    const posts = Array.from({length: numberOfPosts}).map(() => {
      return {
        title: faker.company.name(),
        content: faker.lorem.paragraphs(),
        view_count: Math.floor(Math.random() * 100),
        created_at: faker.date.past(),
        image_url: faker.image.imageUrl(),
        user_id: parseInt(user.id),
        posted_by: user.username
      }
    })
    await knex('posts').insert(posts);
  }))

  data = await knex("posts").count("*")
  console.log(cowsay.say({text: `Inserted ${data[0].count} posts`}))

};
