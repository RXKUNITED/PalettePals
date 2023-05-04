const destroy = async (req, res) => {
  // console.log(req)
    const {
        db: { Post },
        params: { id },
     } = req;
      const deleted = await Post.delete(Number(id));
      console.log(deleted)
      res.sendStatus(deleted ? 204 : 404)
}

module.exports = destroy;