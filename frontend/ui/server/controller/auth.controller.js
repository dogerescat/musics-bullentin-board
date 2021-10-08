const baseAxios = require('axios');
const axios = baseAxios.create({
  baseURL: 'http://backend:8080', 
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'  
});
const { validationResult } = require("express-validator");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = user => {
  let data = {
    user_id: user.user_id,
    name: user.name,
    email: user.email
  };
  const option = {
    algorithm: "HS256",
    expiresIn: "1h"
  };
  const token = jwt.sign(data, process.env.SECRET_KEY, option);
  return token;
};

const createErrorMessage = (msg) => {
    let message = { error: msg };
    message = JSON.stringify(message);
    return message;
};

const saveThirtyMinutesLater = (req) => {
  const now = new Date();
  const thirtyMinutesLater = now.setMinutes(now.getMinutes() + 1);
  req.session.thirtyMinutesLaterTime = thirtyMinutesLater;
  delete req.session.falseLoginCounter;
};


module.exports = {
  snsLogin: (req, res) => {
    if(req.authInfo.result) {
      const token = createToken(req.user);
      req.session.accessToken = `Bearer ${token}`;
    }
    res.render('message.ejs',{ message: req.authInfo.message});
  },
  signUp: async (req, res) => {
    const response = await axios.get(`/api/v1/users/${req.params.id}`);
    const data = JSON.parse(response.data);
    if(data.result) {
      const token = createToken(data.user);
      req.session.accessToken = `Bearer ${token}`;
      res.json(JSON.stringify({result: true}));
      return 
    }
    res.json(JSON.stringify({result: false}));
  },
  login: async (req, res) => {
    if (req.session.thirtyMinutesLaterTime) {
      const now = new Date();
      if (now < req.session.thirtyMinutesLaterTime) {
        const response = createErrorMessage(
          "ログインに3回失敗したので、30分間ログインできません。"
        );
        return res.json(response);
      }
      delete req.session.thirtyMinutesLaterTime;
    }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const response = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(response);
    }
    const rp = await axios.post('/api/v1/users/login', {email: req.body.email});
    const data = JSON.parse(rp.data);
    if(!data.result) {
      res.json(rp);
    }
    if (data.user.length === 0) {
      if (!req.session.falseLoginCounter) {
        req.session.falseLoginCounter = 1;
      } else if (req.session.falseLoginCounter === 1) {
        saveThirtyMinutesLater(req);
      } else {
        req.session.falseLoginCounter++;
      }
      const resp = createErrorMessage('ユーザーが見つかりません。');
      return res.json(resp);
    } else if(data.user[0].sns) {
      const response = createErrorMessage(`このメールアドレスは${data.user[0].sns}のアカウントで使用されています。`);
      return res.json(response);
    } else if (!bcrypt.compareSync(req.body.password, data.user[0].password)) {
      if (!req.session.falseLoginCounter) {
        req.session.falseLoginCounter = 1;
      } else {
        req.session.falseLoginCounter++;
      }
      const response = createErrorMessage('パスワードが正しくありません。');
      return res.json(response);
    } else if (!data.user[0].emailVerifiedAt) {
      if (!req.session.falseLoginCounter) {
        req.session.falseLoginCounter = 1;
      } else {
        req.session.falseLoginCounter++;
      }
      const response = createErrorMessage('本登録が済んでいません。');
      return res.json(response);
    }
    const token = createToken(data.user[0]);
    req.session.accessToken = `Bearer ${token}`;
    res.json(JSON.stringify({result: true}));
  },
  loginJwt: (req, res) => {
    let token = '';
    let response = {
      userData: {},
    };
    if (
      req.session.accessToken &&
      req.session.accessToken.split(' ')[0] === 'Bearer'
    ) {
      token = req.session.accessToken.split(' ')[1];
    } else {
      response = JSON.stringify(response);
      res.json(response);
      return;
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        response = JSON.stringify(response);
        res.json(response);
        return;
      } else {
        response.result = true;
        response.userData.token = token;
        response.userData.user_id = decoded.user_id;
        response.userData.name = decoded.name;
        response = JSON.stringify(response);
        res.json(response);
      }
    });
  },
  logout: (req, res) => {
    delete req.session.accessToken;
    res.json();
  }
};
