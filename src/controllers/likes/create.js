const createComment = async (req, res) => {
    const {
      db: { comment },
      body: { comment },
    } = req;

    const post = await Comment.create(comment);
    // session.userId = user.id;
  
    res.send(post);
  };
  
  module.exports = createComment;
  