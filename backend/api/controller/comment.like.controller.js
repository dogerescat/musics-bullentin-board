const CommentLike = require('../model/comment.like');

module.exports = {
  create: (req, res) => {
    CommentLike.create(req.params, (error, result) => {
      if (error) {
        return;
      }
      const response = JSON.stringify({ result: true});
      res.json(response);
    });
  },
  delete: (req, res) => {
    CommentLike.delete(req.params, (error, result) => {
      if (error) {
        return;
      }
      const response = JSON.stringify({ result: true});
      res.json(response);
    });
  },
};
