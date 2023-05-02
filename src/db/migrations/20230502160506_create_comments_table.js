/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable("comments",(table)=>{
        table.increments("id").primary();
        table.integer("user_id").references("id").inTable("users");
        table.integer("post_id").references("id").inTable("posts");
        table.string("comment_text");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable("comments")
};
