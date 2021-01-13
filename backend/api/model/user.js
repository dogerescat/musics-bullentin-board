const connection = require('./db');

module.exports = {
  get: (callback) => {
    connection.query(`select * from users`, callback);
  },
  create: (body, password, callback) => {
    connection.query(
      `INSERT INTO users SET name = '${body.name}', email = '${body.email}', password = '${password}'`,
      callback
    );
  },
  findOne: (email, password, callback) => {
    connection.query(
      `select * from users where email = '${email}' and password = '${password}'`,
      callback
    );
  },
  checkEmail: (email, callback) => {
    connection.query(`select * from users where email = '${email}'`, callback);
  },
  checkUserId: (id, callback) => {
    connection.query(`select * from users where user_id = '${id}'`, callback);
  },
  addEmailVerifiedAt: (emailVerifiedAt, id, callback) => {
    connection.query(
      `update users set emailVerifiedAt = ? where user_id = ?`,
      [emailVerifiedAt, id],
      callback
    );
  },
};
