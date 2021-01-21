const Comment = require('../model/comment');
const User = require('../model/user');
const CommentLike = require('../model/comment.like');

module.exports = {
  create: (req, res) => {
    Comment.create(req.params.postId, req.body, (error, result) => {
      if (error) {
        return;
      }
      res.json();
    });
  },
  read: (req, res) => {
    Comment.readPostId(req.params.postId, (error, comments) => {
      if (error) {
        return;
      }
      User.read((err, users) => {
        if (err) {
          return;
        }
        CommentLike.read((er, commentLikes) => {
          if (er) {
            return;
          }
          let data = {
            comments: comments,
            users: users,
            commentLikes: commentLikes,
          };
          data = JSON.stringify(data);
          res.json(data);
        });
      });
    });
  },
  getEdit: (req, res) => {
    Comment.readCommentId(req.params.commentId, (error, comment) => {
      if (error) {
        return;
      }
      let data = {
        comment: comment[0],
      };
      data = JSON.stringify(data);
      res.json(data);
    });
  },
  update: (req, res) => {
    Comment.update(req.body.body, req.params.commentId, (error, result) => {
      if (error) {
        return;
      }
      let data = {
          result: true
      }
      data = JSON.stringify(data);
      res.json(data);
    });
  },
  delete: (req, res) => {
    Comment.delete(req.params.commentId, (error, result) => {
      if (error) {
        return;
      }
      CommentLike.deleteComment(req.params.commentId, (err, resu) => {
        if (err) {
          return;
        }
      });
      res.json();
    });
  },
};
