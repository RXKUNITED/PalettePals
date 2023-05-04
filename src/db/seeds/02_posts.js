/**
 *  table.increments("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table.string("img_url");
    table.string("caption");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  
  await knex('posts').insert([
    {id: 1, user_id: 1, img_url: "https://cdn.shopify.com/s/files/1/1551/3581/files/Artist_Thumbnail_-__0004_PICASSO_b1073_jacqueline_in_a_straw_hat_lipic1073sc_un1.jpg?v=1659989054`",caption: "hi"},
    {id: 2, user_id: 2, img_url: "", caption: "test"},
    {id: 3, user_id: 2, img_url: "", caption: "test"},
  ]);
};
