const connection = require('./db');

module.exports = {
  create: (body, callback) => {
    connection.query(
      `INSERT INTO users SET name = '${body.name}', email = '${body.email}', password = '${body.password}'`,
      callback
    );
  },
  findOne: (body, callback) => {
    connection.query(
      `select * from users where email = '${body.email}' and password = '${body.password}'`,
      callback
    );
  },
};
