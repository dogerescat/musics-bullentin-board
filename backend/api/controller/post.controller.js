const Post = require('../model/post');
const User = require('../model/user');
module.exports = {
  get: (req, res) => {
    Post.get((error, posts) => {
      if (error) {
        return;
      }
      User.get((err, users) => {
        if (err) {
          return;
        }
        let data = {};
        data.posts = posts;
        data.users = users;
        data = JSON.stringify(data);
        res.json(data);
      }) 
    });
  },
  create: (req, res) => {
    Post.create(req.body, (error, result) => {
      if (error) {
        return;
      }
      res.json();
    });
  },
};
