const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

module.exports = {
  create: (req, res) => {
    User.create(req.body, (error, result) => {
      if (error) {
        return;
      }
      User.findOne(req.body, (e, r) => {
        if (e) {
          return;
        }
        let data = {
          user_id: r[0].user_id,
          name: r[0].name,
          email: r[0].email,
          password: r[0].password,
        };
        const option = {
          algorithm: 'HS256',
          expiresIn: '1h',
        };
        const token = jwt.sign(data, env.SECRET_KEY, option);
        data.token = token;
        data = JSON.stringify(data);
        res.json(data);
      });
    });
  },
  login: (req, res) => {
    User.findOne(req.body, (error, result) => {
      let data = {
        user_id: result[0].user_id,
        name: result[0].name,
        email: result[0].email,
        password: result[0].password,
      };
      const option = {
        algorithm: 'HS256',
        expiresIn: '1h',
      };
      const token = jwt.sign(data, env.SECRET_KEY, option);
      data.token = token;
      data = JSON.stringify(data);
      res.json(data);
    });
  },
};
