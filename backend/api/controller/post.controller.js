const Post = require('../model/post');
module.exports = {
  get: (req, res) => {
    Post.get((error, list) => {
      if (error) {
        return;
      }
      list = JSON.stringify(list);
      res.json(list);
    });
  },
  create: (req, res) => {
    console.log(req);
    Post.create(req.body, (error, result) => {
      if (error) {
        return;
      }
      res.json();
    });
  },
};
