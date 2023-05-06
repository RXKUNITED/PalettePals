// const Like = require("../../db/models/likes");
const destroy = async (req, res) => {
  console.log("yo");
  // console.log(req)
    const {
        db: { Like },
        params: { userid, id },
    } = req;

      const deleted = await Like.delete(userid,id);
      res.sendStatus(deleted ? 204 : 404)
}

module.exports = destroy;