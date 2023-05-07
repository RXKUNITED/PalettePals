//list comments under certain post
const listOne = async (req, res) => {
    const { Like } = req.db;
    const {params:{userid, id}} = req;
    const like = await Like.findUserLikes(userid, id);
    res.send(like);
  };
  module.exports = listOne;
  