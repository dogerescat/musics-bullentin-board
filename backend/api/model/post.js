const connection = require('./db');

module.exports = {
  get: (callback) => {
    connection.query(`select * from posts`, callback);
  },
  create: (body, callback) => {
    connection.query(
      `INSERT INTO posts SET title = '${body.title}', artist = '${body.artist}', category = '${body.category}', body = '${body.body}', user_id = '${body.user_id}'`,
      callback
    );
  },
};
