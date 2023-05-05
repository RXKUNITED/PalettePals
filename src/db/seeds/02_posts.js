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
    {id: 2, user_id: 2, img_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg", caption: "test"},
    {id: 3, user_id: 2, img_url: "https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg", caption: "test"},
  ]);
};
