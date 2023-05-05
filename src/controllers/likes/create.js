const { findUserLikes } = require("../../db/models/likes");

const createLike = async (req, res) => {
  const {
    db: { Like },
    body: { user_id, post_id },
  } = req;
  if(findUserLikes(user_id, post_id)){
res.sendStatus(400);
  } else {
    const like = await Like.create(user_id, post_id);
    res.send(like);
  }
// console.log(await Like.findUserLikes(7,9));

  // session.userId = user.id;


};

module.exports = createLike;