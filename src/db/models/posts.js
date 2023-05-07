const knex = require('../knex');

class Post {
  constructor({ id, user_id, img_url, caption, username}) {
    this.id = id 
    this.user_id = user_id
    this.img_url = img_url;
    this.caption = caption;
    this.username = username;
  }

  static async list() {
    try {
      const query = 'SELECT posts.*, username FROM posts JOIN users ON posts.user_id = users.id';
      const { rows } = await knex.raw(query);
      return rows.map((posts) => new Post(posts));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = 'SELECT * FROM posts WHERE id = ?';
      const { rows: [post] } = await knex.raw(query, [id]);
      return post ? new Post(post) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(user_id, img_url, caption, username) {
    try {
      const query = `INSERT INTO posts (user_id, img_url, caption)
        VALUES (?, ?, ?) RETURNING *`;
        //do ? when sending info so that safe from others and question marks reflect  whats in array
      const { rows: [post] } = await knex.raw(query, [user_id, img_url, caption]);
      return new Post(post);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  update = async (caption) => { // dynamic queries are easier if you add more properties
    try {
      const [updatedPost] = await knex('posts')
        .where({ id: this.id })
        .update({ caption })
        .returning('*');
      return updatedPost ? new Post(updatedPost) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  // static async deleteAll() {
  //   try {
  //     return knex.raw('TRUNCATE users;');
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }
  static async delete(id) {
    try{
      await knex.raw(`DELETE FROM comments WHERE post_id = ?`,[ id ])
      await knex.raw(`DELETE FROM likes WHERE post_id = ?`,[ id ])
      const deleted = await knex.raw(`DELETE FROM posts WHERE id = ? RETURNING *;`,[ id ])
      return deleted.rowCount
    }
    catch (err){
      console.log(err)
      return null;
    }
  }

}

module.exports = Post;
