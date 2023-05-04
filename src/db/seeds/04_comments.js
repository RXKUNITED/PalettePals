/**
 *       table.increments("id").primary();
        table.integer("user_id").references("id").inTable("users");
        table.integer("post_id").references("id").inTable("posts");
        table.string("comment_text");
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').insert([
    {id: 1, user_id: 1, post_id: 1, comment_text: "hi im xhes"},
    {id: 2, user_id: 2, post_id: 2, comment_text: "hi im Koumba"},
  ]);
};
