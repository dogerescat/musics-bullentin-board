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
  getEdit: (id, callback) => {
    connection.query(
      `select * from posts where post_id = ${id}`,
      callback
    );
  },
  update: (id, body, callback) => {
    connection.query(
      `update posts set title = ?, artist = ?, category = ?, body = ? where post_id = ?`,
      [body.title, body.artist, body.category, body.body, id],
      callback
    )
  },
  delete: (id, callback) => {
    connection.query(
      `delete from posts where post_id = '${id}'`,
      callback
    );
  }
};
