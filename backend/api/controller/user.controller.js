const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  host: 'mail',
  port: 1025,
  auth: {
    user: 'user',
    pass: 'password'
  }
});

const createErrorMessage = (msg) => {
  let message = {error: msg};
  message = JSON.stringify(message);
  return message;
}

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
  data.msg = msg;
  data = JSON.stringify(data);
  return data;
}

module.exports = {
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
      let message = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(message);
    }
    const salt = bcrypt.genSaltSync(8)
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    User.checkEmail(req.body.email, (err, re) => {
      if(!re.length === 0) {
        let message = createErrorMessage('既に登録されています');
        return res.json(message);
      }
      User.create(req.body, hashPassword, (error, result) => {
        if(error) {
          let message = createErrorMessage('登録できませんでした');
          return res.json(message);
        }
        User.findOne(req.body.email, hashPassword, (erro, resu) => {
          const hash = crypto.createHash('sha1')
          .update(resu[0].email)
          .digest('hex');
          const now = new Date();
          const expiration = now.setHours(now.getHours() + 1);
          let verificationUrl = req.get('origin') +'/verify/'+ resu[0].user_id +'/'+ hash +'?expires='+ expiration;
          const signature = crypto.createHmac('sha256', env.APP_KEY)
            .update(verificationUrl)
            .digest('hex');
          verificationUrl += '&signature='+ signature;
          transporter.sendMail({
            from: 'from@example.com',
            to: resu[0].email,
            text: "以下のURLをクリックして本登録を完了させてください。\n\n"+ verificationUrl,
            subject: '本登録メール',
          });
          let data = {
            result: true,
            message: 'メールを送信しました。' 
          };
          data = JSON.stringify(data);
          return res.json(data);
        })
      })
    })
  },
  realSignUp: (req, res) => {
    const id = req.params.id
    User.checkUserId(id, (error, result) => {
      if(result.length === 0) {
        let message = createErrorMessage('このurlは正しくありません。');
        return res.json(message);
      } else if(result[0].emailVerifiedAt) {
        let message = createErrorMessage('本登録済みです');
        return res.json(message);
      }
      const now = new Date();
        const hash = crypto.createHash('sha1')
          .update(result[0].email)
          .digest('hex');
        const isCorrectHash = (hash === req.params.hash);
        const isExpired = (now.getTime() > parseInt(req.query.expires));
        const verificationUrl = `http://localhost:3000/` + req.originalUrl.split('&signature=')[0].split('users/')[1];
        const signature = crypto.createHmac('sha256', env.APP_KEY)
          .update(verificationUrl)
          .digest('hex');
        const isCorrectSignature = (signature === req.query.signature);
        if(!isCorrectHash || !isCorrectSignature || isExpired) {
          let message = createErrorMessage('このURLはすでに有効期限切れか、正しくありません。');
          return res.json(message);  
        } else {  
          User.addEmailVerifiedAt(now, id, (err, resu) => {
            if(err) {
              let message = createErrorMessage('本登録できませんでした。');
              return res.json(message);  
            }
            const data = createToken(result,'本登録完了しました。');
            res.json(data);
          })
        }
    })
  },
  login: (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
      let message = createErrorMessage(validationErrors.errors[0].msg);
      return res.json(message);
    }
    User.checkEmail(req.body.email, (error, result) => {
      if(result[0].length === 0) {
        let message = createErrorMessage('ユーザーが見つかりません。');
        return res.json(message);
      } else if(!bcrypt.compareSync(req.body.password, result[0].password)) {
        let message = createErrorMessage('パスワードが正しくありません。');
        return res.json(message)
      } else if(!result[0].emailVerifiedAt) {
        let message = createErrorMessage('本登録が済んでいません。');
        return res.json(message)
      }
      const data = createToken(result,'ログインしました。');
      res.json(data);
    });
  },
};
