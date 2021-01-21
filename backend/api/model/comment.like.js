const connection = require('./db');

module.exports = {
  create: (params, callback) => {
    connection.query(
      `INSERT INTO comment_likes SET comment_id = '${params.commentId}', user_id = '${params.userId}'`,
      callback
    );
  },
  read: (callback) => {
    connection.query(`select * from comment_likes`, callback);
  },
  delete(params, callback) {
    connection.query(
      `delete from comment_likes where user_id = '${params.userId}' and comment_id = '${params.commentId}'`,
      callback
    );
  },
  deleteComment: (id, callback) => {
    connection.query(
      `delete from comment_likes where comment_id = '${id}'`,
      callback
    );
  }
};
