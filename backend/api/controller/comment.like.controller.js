const CommentLike = require('../model/comment.like');

const createErrorMessage = (msg) => {
  let message = {error: msg};
  message = JSON.stringify(message);
  return message;
};

module.exports = {
  create: (req, res) => {
    CommentLike.create(req.params, (error) => {
      if (error) {
        const response = createErrorMessage('いいねできませんでした。');
        res.json(response);
        return;
      }
      const response = JSON.stringify({ result: true});
      res.json(response);
    });
  },
  delete: (req, res) => {
    CommentLike.delete(req.params, (error) => {
      if (error) {
        const response = createErrorMessage('いいねを解除できませんでした。');
        res.json(response);
        return;
      }
      const response = JSON.stringify({ result: true});
      res.json(response);
    });
  },
};
