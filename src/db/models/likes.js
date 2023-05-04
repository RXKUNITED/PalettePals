const knex = require('../knex');

class Like {
  constructor({ id, user_id, post_id }) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
  }

  static async list() {
    try {
      const query = 'SELECT * FROM likes';
      const { rows } = await knex.raw(query);
      return rows.map((likes) => new Like(likes));
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async find(id) {
    try {
      const query = 'SELECT * FROM likes WHERE id = ?';
      const { rows: [like] } = await knex.raw(query, [id]);
      return post ? new Like(like) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(user_id, post_id) {
    try {
      const query = `INSERT INTO likes (user_id, post_id)
        VALUES (?, ?) RETURNING *`;
        //do ? when sending info so that safe from others and question marks reflect  whats in array
      const { rows: [like] } = await knex.raw(query, [user_id, post_id]);
      return new Like(like);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update = async (caption) => { // dynamic queries are easier if you add more properties
    try {
      const [updatedLike] = await knex('likes')
        .where({ id: this.id })
        .update({ caption })
        .returning('*');
      return updatedLike ? new Like(updatedLike) : null;
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
      
      // await knex.raw(`DELETE FROM likes WHERE likes_id = ? RETURNING *;`,[ id ])
      const deleted = await knex.raw(`DELETE FROM likes WHERE id = ? RETURNING *;`,[ id ])
      return deleted.rowCount
    }
    catch (err){
      console.log(err)
      return null;
    }
  }

}

module.exports = Like;
