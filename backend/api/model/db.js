const mysql = require('mysql');
require('dotenv').config();
// const env = process.env;
const mysql_setting = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};
const getConnection = () => {
  const connection = mysql.createConnection(mysql_setting);
  // const connection = mysql.createPool(mysql_setting);
  module.exports = connection;
};
getConnection();
