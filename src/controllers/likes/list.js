//list comments under certain post
const listLikes = async (req, res) => {
    const { Like } = req.db;
    const {params:{id}} = req;
    const like = await Like.list(id);
    res.send(like);
  };
  
  module.exports = listLikes;
  