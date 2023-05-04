const User = require('../db/models/user');
const Post = require('../db/models/posts');
const Like = require('../db/models/likes');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Post,
    Like,
  };
  next();
};

module.exports = addModels;
