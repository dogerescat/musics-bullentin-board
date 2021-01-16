const PostLike = require('../model/post.like');

module.exports = {
  create(req, res) {
    PostLike.create(req.params, (error, result) => {
      if(error) {
        return res.json({result: false});
      }
      const response = JSON.stringify({result: true});
      res.json(response);
    });
  },
  delete(req, res) {
    PostLike.delete(req.params, (error, result) => {
      if(error) {
        return res.json();
      }
      const response = JSON.stringify({result: true});
      res.json(response);
    })
  },
};
