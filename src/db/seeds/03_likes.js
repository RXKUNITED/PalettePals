/**
 *         table.increments("id").primary();
        table.integer("user_id").references("id").inTable("users");
        table.integer("post_id").references("id").inTable("posts");
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  
  await knex('likes').insert([
    {id: 1, user_id: 1, post_id: 1 },
    {id: 2, user_id: 2, post_id: 2},
  ]);
};
