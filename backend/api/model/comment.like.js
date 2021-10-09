const connection = require('./db');

module.exports = {
  create: (params, callback) => {
    connection.query(
      `insert into comment_likes SET comment_id = ?, user_id = ?`,
      [params.commentId, params.userId],
      callback
    );
  },
  read: (callback) => {
    connection.query(`select * from comment_likes`, callback);
  },
  delete(params, callback) {
    connection.query(
      `delete from comment_likes where user_id = ? and comment_id = ?`,
      [params.userId, params.commentId],
      callback
    );
  },
  deleteComment: (id, callback) => {
    connection.query(
      `delete from comment_likes where comment_id = ?`,
      [id],
      callback
    );
  },
};
