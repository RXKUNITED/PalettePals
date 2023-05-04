const createLike = async (req, res) => {
  const {
    db: { Like },
    body: { user_id, post_id },
  } = req;

  const like = await Like.create(user_id, post_id);
  // session.userId = user.id;

  res.send(like);
};

module.exports = createLike;