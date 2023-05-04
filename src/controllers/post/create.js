const createPost = async (req, res) => {
    const {
      db: { Post },
      body: { user_id, img_url, caption },
    } = req;

    const post = await Post.create(user_id, img_url, caption);
    // session.userId = user.id;
  
    res.send(post);
  };
  
  module.exports = createPost;
  