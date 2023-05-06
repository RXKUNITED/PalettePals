const { findUserLikes } = require("../../db/models/likes");

const createLike = async (req, res) => {
  const {
    db: { Like },
    body: { user_id, post_id },
  } = req;
  if(await Like.findUserLikes(user_id, post_id)){
    const like = await Like.create(user_id, post_id);
    res.send(like);
  } else {
    res.sendStatus(400);
  }
// console.log(await Like.findUserLikes(7,9));

  // session.userId = user.id;


};

module.exports = createLike;