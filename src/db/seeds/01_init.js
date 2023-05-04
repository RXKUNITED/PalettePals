const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await User.deleteAll(); //comment if seed running issues says truncate
  await knex('posts').del()
  await knex('likes').del()
  await knex('comments').del()
  await User.create('cool_cat', 'password1');
  await User.create('l33t-guy', 'password1');
};
