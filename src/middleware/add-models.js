const User = require('../db/models/user');
const Post = require('../db/models/posts');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Post,
  };
  next();
};

module.exports = addModels;
