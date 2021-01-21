const Post = require('../model/post');
const User = require('../model/user');
const PostLike = require('../model/post.like');
const Comment = require('../model/comment');

module.exports = {
  read: (req, res) => {
    Post.read((error, posts) => {
      if (error) {
        return;
      }
      User.read((err, users) => {
        if (err) {
          return;
        }
        PostLike.read((er, postLikes) => {
          if(er) {
            return;
          }
          Comment.read((e, comments) => {
            if(e) {
              return;
            }
            let data = {};
            data.posts = posts;
            data.users = users;
            data.postLikes = postLikes;
            data.comments = comments;
            data = JSON.stringify(data);
            res.json(data);
          });
        });
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
  getEdit: (req, res) => {
    Post.readPostId(req.params.id, (error, post) => {
      if(error) {
        return;
      }
      let postData = post[0];
      postData = JSON.stringify(postData);
      res.json(postData);
    });
  },
  update: (req, res) => {
    Post.update(req.params.id, req.body,(error,result) => {
      if(error) {
        return;
      }
      res.json();
    });
  },
  delete: (req, res) => {
    Post.delete(req.params.id, (error, result) => {
      if(error) {
        return;
      }
      PostLike.deletePost(req.params.id, (err, resu) => {
        if(error) {
          return;
        }
        res.json();
      })
    })
  }
};
