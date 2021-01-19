const Post = require('../model/post');
const User = require('../model/user');
const PostLike = require('../model/post.like');

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
        PostLike.get((er, postLikes) => {
          if(er) {
            return;
          }
          let data = {};
          data.posts = posts;
          data.users = users;
          data.postLikes = postLikes;
          data = JSON.stringify(data);
          res.json(data);
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
    Post.getEdit(req.params.id, (error, post) => {
      if(error) {
        return;
      }
      let postData = post[0];
      postData = JSON.stringify(postData);
      res.json(postData);
    });
  },
  update: (req, res) => {
     console.log(req.params);
    Post.update(req.params.id, req.body,(error,result) => {
      if(error) {
        return;
      }
      res.json();
    });
  },
  delete: (req, res) => {
    console.log(req.params);
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
