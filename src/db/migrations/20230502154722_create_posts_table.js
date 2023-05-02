/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
return knex.schema.createTable("posts",(table)=>{
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table.string("img_url");
    table.string("caption");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable("posts")
};
