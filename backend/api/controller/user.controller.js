const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: env.GOOGLE_ACOUNT_ADDRESS,
    pass: env.GOOGLE_ACOUNT_PASSWORD,
  },
});

const saveThirtyMinutesLater = (req) => {
  const now = new Date();
  const thirtyMinutesLater = now.setMinutes(now.getMinutes() + 30);
  req.session.thirtyMinutesLaterTime = thirtyMinutesLater;
  delete req.session.falseLoginCounter;
};

const createErrorMessage = (msg) => {
  let message = { error: msg };
  message = JSON.stringify(message);
  return message;
};

const createToken = (user, msg) => {
  let data = {
    user_id: user[0].user_id,
    name: user[0].name,
    email: user[0].email,
    password: user[0].password,
  };
  const option = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };
  const token = jwt.sign(data, env.SECRET_KEY, option);
  data.token = token;
  data.result = true;
  data.msg = msg;
  data = JSON.stringify(data);
  return { data, token };
};

module.exports = {
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const response = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(response);
    }
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    User.readEmail(req.body.email, (err, re) => {
      if (!re.length === 0) {
        const response = createErrorMessage('既に登録されています');
        return res.json(response);
      }
      User.create(req.body, hashPassword, (error, result) => {
        if (error) {
          const response = createErrorMessage('登録できませんでした');
          return res.json(response);
        }
        User.findOne(req.body.email, hashPassword, (erro, resu) => {
          const hash = crypto
            .createHash('sha1')
            .update(resu[0].email)
            .digest('hex');
          const now = new Date();
          const expiration = now.setHours(now.getHours() + 1);
          let verificationUrl =
            req.get('origin') +
            '/verify/' +
            resu[0].user_id +
            '/' +
            hash +
            '?expires=' +
            expiration;
          const signature = crypto
            .createHmac('sha256', env.APP_KEY)
            .update(verificationUrl)
            .digest('hex');
          verificationUrl += '&signature=' + signature;
          transporter.sendMail({
            from: env.GOOGLE_ACOUNT_ADDRESS,
            to: resu[0].email,
            text:
              '以下のURLをクリックして本登録を完了させてください。\n\n' +
              verificationUrl,
            subject: '本登録メール',
          });
          let data = {
            result: true,
            message:
              'メールを送信しました。\n本登録リンクの有効期限は1時間です。',
          };
          data = JSON.stringify(data);
          return res.json(data);
        });
      });
    });
  },
  signUp: (req, res) => {
    const id = req.params.id;
    User.readUserId(id, (error, result) => {
      if (result.length === 0) {
        const response = createErrorMessage('このurlは正しくありません。');
        return res.json(response);
      } else if (result[0].emailVerifiedAt) {
        const response = createErrorMessage('本登録済みです');
        return res.json(response);
      }
      const now = new Date();
      const hash = crypto
        .createHash('sha1')
        .update(result[0].email)
        .digest('hex');
      const isCorrectHash = hash === req.params.hash;
      const isExpired = now.getTime() > parseInt(req.query.expires);
      const verificationUrl =
        env.APP_ORIGIN +
        req.originalUrl.split('&signature=')[0].split('users/')[1];
      const signature = crypto
        .createHmac('sha256', env.APP_KEY)
        .update(verificationUrl)
        .digest('hex');
      const isCorrectSignature = signature === req.query.signature;
      if (!isCorrectHash || !isCorrectSignature || isExpired) {
        const response = createErrorMessage(
          'このURLはすでに有効期限切れか、正しくありません。'
        );
        return res.json(response);
      } else {
        User.addEmailVerifiedAt(now, id, (err, resu) => {
          if (err) {
            const response = createErrorMessage('本登録できませんでした。');
            return res.json(response);
          }
          const data = createToken(result, '本登録完了しました。');
          res.json(data.data);
        });
      }
    });
  },
  login: (req, res) => {
    if (req.session.thirtyMinutesLaterTime) {
      const now = new Date();
      if (now < req.session.thirtyMinutesLaterTime) {
        const response = createErrorMessage(
          'ログインに3回失敗したので、30分間ログインできません。'
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
    User.readEmail(req.body.email, (error, result) => {
      if (result.length === 0) {
        if (!req.session.falseLoginCounter) {
          req.session.falseLoginCounter = 1;
        } else if (req.session.falseLoginCounter === 1) {
          saveThirtyMinutesLater(req);
        } else {
          req.session.falseLoginCounter++;
        }
        const response = createErrorMessage('ユーザーが見つかりません。');
        return res.json(response);
      } else if (result[0].sns) {
        const response = createErrorMessage(
          `このメールアドレスは${result[0].sns}のアカウントで使用されています。`
        );
        return res.json(response);
      } else if (!bcrypt.compareSync(req.body.password, result[0].password)) {
        if (!req.session.falseLoginCounter) {
          req.session.falseLoginCounter = 1;
        } else {
          req.session.falseLoginCounter++;
        }
        const response = createErrorMessage('パスワードが正しくありません。');
        return res.json(response);
      } else if (!result[0].emailVerifiedAt) {
        if (!req.session.falseLoginCounter) {
          req.session.falseLoginCounter = 1;
        } else {
          req.session.falseLoginCounter++;
        }
        const response = createErrorMessage('本登録が済んでいません。');
        return res.json(response);
      }
      const response = createToken(result, 'ログインしました。');
      req.session.accessToken = `Bearer ${response.token}`;
      res.json(response.data);
    });
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
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
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
  read: (req, res) => {
    User.readUserId(req.params.id, (error, user) => {
      if (error) {
        const response = createErrorMessage('ユーザーの取得に失敗しました。');
        return res.json(response);
      }
      const response = JSON.stringify({ user: user[0], result: true });
      res.json(response);
    });
  },
  edit: (req, res) => {
    User.update(req.params.id, req.body, (error) => {
      if(error) {
        const response = createErrorMessage('編集に失敗しました。');
        return res.json(response);
      }
      res.json(JSON.stringify({result: true}));
    });
  },
  logout: (req, res) => {
    delete req.session.accessToken;
    res.json();
  },
};
