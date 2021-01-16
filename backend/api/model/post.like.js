const connection = require('./db');

module.exports = {
  create(params, callback) {
    connection.query(
      `INSERT INTO post_likes SET post_id = '${params.post_id}', user_id = '${params.user_id}'`,
      callback
    );
  },
  delete(params, callback) {
    connection.query(
      `delete from post_likes where user_id = '${params.user_id}' and post_id = '${params.post_id}'`,
      callback
    );
  },
  get(callback) {
    connection.query('select * from post_likes', callback);
  },
};
