const destroy = async (req, res) => {
  // console.log(req)
    const {
        db: { Like },
        params: { id },
     } = req;
      const deleted = await Like.delete(Number(id));
      console.log(deleted)
      res.sendStatus(deleted ? 204 : 404)
}

module.exports = destroy;