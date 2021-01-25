const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

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
  const token = jwt.sign(data, env.SECRET_KEY, option);
  data.token = token;
  data.result = true;
  data = JSON.stringify(data);
  return { data, token };
};

module.exports = {
  snsLogin: (req, res) => {
    if(req.authInfo.message) {
      res.render('message.ejs', { message: req.authInfo.message });
      return;
    }
    const response = createToken(req.user);
    req.session.accessToken = `Bearer ${response.token}`;
    res.render('message.ejs', { message: 'ログイン完了しました。'});
  },
};
