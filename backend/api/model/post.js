const connection = require('./db');

module.exports = {
  read: (callback) => {
    connection.query(`select * from posts`, callback);
  },
  create: (body, callback) => {
    connection.query(
      `INSERT INTO posts SET title = '${body.title}', artist = '${body.artist}', category = '${body.category}', body = '${body.body}', user_id = '${body.user_id}'`,
      callback
    );
  },
  readPostId: (id, callback) => {
    connection.query(
      `select * from posts where post_id = ${id}`,
      callback
    );
  },
  searchCategory: (category, callback) => {
    connection.query(
      `select * from posts where category = '${category}'`,
      callback
    ); 
  },
  searchArtist: (artist, callback) => {
    connection.query(
      `select * from posts where artist = '${artist}'`,
      callback
    )
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
