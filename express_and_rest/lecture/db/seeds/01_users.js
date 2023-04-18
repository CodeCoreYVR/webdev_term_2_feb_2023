/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker')
const cowsay = require("cowsay")
const bcrypt = require("bcrypt")

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  const users = await Promise.all(
    Array.from({length:20}).map(async () => {
      return {
        username: faker.internet.userName(),
        password: await bcrypt.hash(faker.internet.password(), 10)
      }
    })
  )
  await knex('users').insert(users);
  data = await knex("users").count("*")
  console.log(cowsay.say({text: `Inserted ${data[0].count} users`}))
};
