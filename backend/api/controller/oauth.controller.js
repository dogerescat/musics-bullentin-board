const jwt = require('jsonwebtoken');
require('dotenv').config();
// const env = process.env;
const User = require('../model/user');

const createToken = (user) => {
  let data = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
  };
  const option = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };
  const token = jwt.sign(data, process.env.SECRET_KEY, option);
  return token;
};

module.exports = {
  snsLogin: (req, res) => {
    if (req.authInfo.message) {
      res.render('message.ejs', { message: req.authInfo.message });
      return;
    }
    const token = createToken(req.user);
    if(!req.user.user_id) {
      return;
    }
    User.saveToken(token, req.user.user_id, (error) => {
      if(error) {
        return;
      }
      res.render('message.ejs', { message: 'ログイン完了しました。' });
    }); 
  },
  setToken: (req, res) => {
    User.readToken(req.params.sns, (error, result) => {
      if(error) {
        return res.json(JSON.stringify({result: false}));
      } else if(result.length === 0) {
        return res.json(JSON.stringify({result: false}));
      }
      User.deleteToken(result[0].user_id, (error) => {
        if(error) {
          return res.json(JSON.stringify({result: false}));
        }
        req.session.accessToken = `Bearer ${result[0].token}`;
        res.json(JSON.stringify({result: true}));
      });
    });
  },
};
