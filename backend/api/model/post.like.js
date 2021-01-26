const connection = require('./db');

module.exports = {
  create(params, callback) {
    connection.query(
      `insert into post_likes SET post_id = '${params.postId}', user_id = '${params.userId}'`,
      callback
    );
  },
  delete(params, callback) {
    connection.query(
      `delete from post_likes where user_id = '${params.userId}' and post_id = '${params.postId}'`,
      callback
    );
  },
  read(callback) {
    connection.query(`select * from post_likes`, callback);
  },
  deletePost: (id, callback) => {
    connection.query(
      `delete from post_likes where post_id = '${id}'`,
      callback
    );
  },
};
