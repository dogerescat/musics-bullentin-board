const connection = require('./db');

module.exports = {
  create: (postId, body, callback) => {
    connection.query(
      `insert into comments SET post_id = '${postId}', user_id = '${body.userId}', body = '${body.body}'`,
      callback
    );
  },
  readPostId: (id, callback) => {
    connection.query(
      `select * from comments where post_id = '${id}'`,
      callback
    );
  },
  readCommentId: (id, callback) => {
    connection.query(
      `select * from comments where comment_id = '${id}'`,
      callback
    );
  },
  update: (body, id, callback) => {
    connection.query(
      `update comments set body = ? where comment_id = ?`,
      [body, id],
      callback
    );
  },
  delete: (id, callback) => {
    connection.query(
      `delete from comments where comment_id = '${id}'`,
      callback
    );
  },
  read: (callback) => {
    connection.query(`select * from comments`, callback);
  },
};
