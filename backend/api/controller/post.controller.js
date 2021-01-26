const Post = require('../model/post');
const User = require('../model/user');
const PostLike = require('../model/post.like');
const Comment = require('../model/comment');
const { validationResult } = require('express-validator');

const createErrorMessage = (msg) => {
  let message = { error: msg };
  message = JSON.stringify(message);
  return message;
};
module.exports = {
  read: (req, res) => {
    Post.read((error, posts) => {
      if (error) {
        const response = createErrorMessage('投稿を読み込めませんでした。');
        res.json(response);
        return;
      }
      User.read((err, users) => {
        if (err) {
          const response = createErrorMessage('投稿を読み込めませんでした。');
          res.json(response);
          return;
        }
        PostLike.read((er, postLikes) => {
          if (er) {
            const response = createErrorMessage('投稿を読み込めませんでした。');
            res.json(response);
            return;
          }
          Comment.read((e, comments) => {
            if (e) {
              const response = createErrorMessage(
                '投稿を読み込めませんでした。'
              );
              res.json(response);
              return;
            }
            let response = {};
            response.result = true;
            response.posts = posts;
            response.users = users;
            response.postLikes = postLikes;
            response.comments = comments;
            response = JSON.stringify(response);
            res.json(response);
          });
        });
      });
    });
  },
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const response = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(response);
    }
    Post.create(req.body, (error, result) => {
      if (error) {
        const response = createErrorMessage('投稿できませんでした。');
        res.json(response);
        return;
      }
      const response = JSON.stringify({ result: true });
      res.json(response);
    });
  },
  getEdit: (req, res) => {
    Post.readPostId(req.params.id, (error, post) => {
      if (error) {
        const response = createErrorMessage('投稿情報を取得できませんでした。');
        res.json(response);
        return;
      }
      let response = {
        result: true,
        post: post[0],
      };
      response = JSON.stringify(response);
      res.json(response);
    });
  },
  searchCategory: (req, res) => {
    Post.searchCategory(req.params.category, (error, posts) => {
      if (error) {
        const response = createErrorMessage('検索に失敗しました。');
        res.json(response);
        return;
      }
      User.read((err, users) => {
        if (err) {
          const response = createErrorMessage('検索に失敗しました。');
          res.json(response);
          return;
        }
        PostLike.read((er, postLikes) => {
          if (er) {
            const response = createErrorMessage('検索に失敗しました。');
            res.json(response);
            return;
          }
          Comment.read((e, comments) => {
            if (e) {
              const response = createErrorMessage('検索に失敗しました。');
              res.json(response);
              return;
            }
            let data = {};
            data.result = true;
            data.posts = posts;
            data.users = users;
            data.postLikes = postLikes;
            data.comments = comments;
            data = JSON.stringify(data);
            res.json(data);
          });
        });
      });
    });
  },
  searchArtist: (req, res) => {
    Post.searchArtist(req.params.artist, (error, posts) => {
      if (error) {
        const response = createErrorMessage('検索に失敗しました。');
        res.json(response);
        return;
      }
      User.read((err, users) => {
        if (err) {
          const response = createErrorMessage('検索に失敗しました。');
          res.json(response);
          return;
        }
        PostLike.read((er, postLikes) => {
          if (er) {
            const response = createErrorMessage('検索に失敗しました。');
            res.json(response);
            return;
          }
          Comment.read((e, comments) => {
            if (e) {
              const response = createErrorMessage('検索に失敗しました。');
              res.json(response);
              return;
            }
            let response = {};
            response.result = true;
            response.posts = posts;
            response.users = users;
            response.postLikes = postLikes;
            response.comments = comments;
            response = JSON.stringify(response);
            res.json(response);
          });
        });
      });
    });
  },
  update: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const response = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(response);
    }
    Post.update(req.params.id, req.body, (error, result) => {
      if (error) {
        const response = createErrorMessage('更新に失敗しました。');
        res.json(response);
        return;
      }
      const response = JSON.stringify({ result: true });
      res.json(response);
    });
  },
  delete: (req, res) => {
    Post.delete(req.params.id, (error, result) => {
      if (error) {
        const response = createErrorMessage('削除に失敗しました。');
        res.json(response);
        return;
      }
      PostLike.deletePost(req.params.id, (err, resu) => {
        if (err) {
          return;
        }
        const response = JSON.stringify({ result: true });
        res.json(response);
      });
    });
  },
};
