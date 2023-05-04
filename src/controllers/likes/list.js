//list comments under certain post
const listLikes = async (req, res) => {
    const { Like } = req.db;
    const like = await Like.list();
    res.send(like);
  };
  
  module.exports = listLikes;
  