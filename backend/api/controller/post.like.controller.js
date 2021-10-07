const PostLike = require('../model/post.like');

const createErrorMessage = (msg) => {
  let message = { error: msg };
  message = JSON.stringify(message);
  return message;
};

module.exports = {
  create(req, res) {
    PostLike.create(req.params, (error, result) => {
      if (error) {
        const response = createErrorMessage('いいねできませんでした。');
        return res.json(response);
      }
      const response = JSON.stringify({ result: true });
      res.json(response);
    });
  },
  delete(req, res) {
    PostLike.delete(req.params, (error, result) => {
      if (error) {
        const response = createErrorMessage('いいねを解除できませんでした。');
        return res.json(response);
      }
      const response = JSON.stringify({ result: true });
      res.json(response);
    });
  },
};
