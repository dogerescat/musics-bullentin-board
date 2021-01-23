const Comment = require('../model/comment');
const User = require('../model/user');
const CommentLike = require('../model/comment.like');
const { validationResult } = require('express-validator');

const createErrorMessage = (msg) => {
  let message = {error: msg};
  message = JSON.stringify(message);
  return message;
}

module.exports = {
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
      const response = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(response);
    }
    Comment.create(req.params.postId, req.body, (error, result) => {
      if (error) {
        const response = createErrorMessage('投稿に失敗しました。');
        res.json(response);
        return;
      }
      const response = JSON.stringify({result: true});
      res.json(response);
    });
  },
  read: (req, res) => {
    Comment.readPostId(req.params.postId, (error, comments) => {
      if (error) {
        const response = createErrorMessage('読み込みに失敗しました。')
        res.json(response);
        return;
      }
      User.read((err, users) => {
        if (err) {
          const response = createErrorMessage('読み込みに失敗しました。')
          res.json(response);  
          return;
        }
        CommentLike.read((er, commentLikes) => {
          if (er) {
            const response = createErrorMessage('読み込みに失敗しました。')
            res.json(response);    
            return;
          }
          let response = {
            result: true,
            comments: comments,
            users: users,
            commentLikes: commentLikes,
          };
          response = JSON.stringify(response);
          res.json(response);
        });
      });
    });
  },
  getEdit: (req, res) => {
    Comment.readCommentId(req.params.commentId, (error, comment) => {
      if (error) {
        const response = createErrorMessage('読み込みに失敗しました。')
        res.json(response);
        return;
      }
      let response = {
        result: true,
        comment: comment[0],
      };
      response = JSON.stringify(response);
      res.json(response);
    });
  },
  update: (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
      const response = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(response);
    }
    Comment.update(req.body.body, req.params.commentId, (error, result) => {
      if (error) {
        const response = createErrorMessage('更新に失敗しました。');
        res.json(response);
        return;
      }
      let response = {
          result: true
      }
      response = JSON.stringify(response);
      res.json(response);
    });
  },
  delete: (req, res) => {
    Comment.delete(req.params.commentId, (error) => {
      if (error) {
        const response = createErrorMessage('削除にに失敗しました。');
        res.json(response);
        return;
      }
      CommentLike.deleteComment(req.params.commentId, (err) => {
        const response = JSON.stringify({result: true});
        res.json(response);
      });
    });
  },
};
