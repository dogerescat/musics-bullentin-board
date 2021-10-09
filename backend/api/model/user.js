const connection = require('./db');

module.exports = {
  read: (callback) => {
    connection.query(`select * from users`, callback);
  },
  create: (body, password, callback) => {
    connection.query(
      `insert into users SET name = ?, email = ?, password = ?`,
      [body.name, body.email, password],
      callback
    );
  },
  findOne: (email, password, callback) => {
    connection.query(
      `select * from users where email = ? and password = ?`,
      [email, password],
      callback
    );
  },
  readEmail: (email, callback) => {
    connection.query(`select * from users where email = ?`, [email], callback);
  },
  readUserId: (id, callback) => {
    connection.query(`select * from users where user_id = ?`, [id], callback);
  },
  addEmailVerifiedAt: (emailVerifiedAt, id, callback) => {
    connection.query(
      `update users set emailVerifiedAt = ? where user_id = ?`,
      [emailVerifiedAt, id],
      callback
    );
  },
  snsCreate: (sns, callback) => {
    connection.query(
      `insert into users set name = ?, email = ?, sns = ?`,
      [sns.displayName, sns.emails[0].value, sns.provider],
      callback
    );
  },
  update: (id, body, callback) => {
    connection.query(
      `update users set name = ?, message = ?, birthday = ? where user_id = ?`,
      [body.name, body.message, body.birthday, id],
      callback
    );
  },
};
