const CommentLike = require('../model/comment.like');

module.exports = {
  create: (req, res) => {
    CommentLike.create(req.params, (error, result) => {
      if (error) {
        return;
      }
      let data = {
        result: true,
      };
      data = JSON.stringify(data);
      res.json(data);
    });
  },
  delete: (req, res) => {
    CommentLike.delete(req.params, (error, result) => {
      if (error) {
        return;
      }
      let data = {
        result: true,
      };
      data = JSON.stringify(data);
      res.json(data);
    });
  },
};
