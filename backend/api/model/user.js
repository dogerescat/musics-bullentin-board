const connection = require('./db');

module.exports = {
  read: (callback) => {
    connection.query(`select * from users`, callback);
  },
  create: (body, password, callback) => {
    connection.query(
      `insert into users SET name = '${body.name}', email = '${body.email}', password = '${password}'`,
      callback
    );
  },
  findOne: (email, password, callback) => {
    connection.query(
      `select * from users where email = '${email}' and password = '${password}'`,
      callback
    );
  },
  readEmail: (email, callback) => {
    connection.query(`select * from users where email = '${email}'`, callback);
  },
  readUserId: (id, callback) => {
    connection.query(`select * from users where user_id = '${id}'`, callback);
  },
  addEmailVerifiedAt: (emailVerifiedAt, id, callback) => {
    connection.query(
      `update users set emailVerifiedAt = ? where user_id = ?`,
      [emailVerifiedAt, id],
      callback
    );
  },
  snsFindEmail: (sns, callback) => {
    connection.query(
      `select * from users where email = '${sns.email}'`,
      callback
    );
  },
  snsCreate: (sns, callback) => {
    connection.query(
      `insert into users set name = '${sns.displayName}', email = '${sns.emails[0].value}', sns = '${sns.provider}'`,
      callback
    );
  },
};
