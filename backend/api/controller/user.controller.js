const User = require('../model/user');
require('dotenv').config();
require('date-utils');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.GOOGLE_ACOUNT_ADDRESS,
    pass: process.env.GOOGLE_ACOUNT_PASSWORD,
  },
});

const createErrorMessage = (msg) => {
  let message = { error: msg };
  message = JSON.stringify(message);
  return message;
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
          now.setHours(now.getHours() + 1);
          const expiration = now.toFormat('YY-MM-DD-HH24-MI-SS');
          let verificationUrl =
            req.get('origin') +
            '/verify/' +
            resu[0].user_id +
            '/' +
            hash +
            '?expires=' +
            expiration;
          const signature = crypto
            .createHmac('sha256', process.env.APP_KEY)
            .update(verificationUrl)
            .digest('hex');
          verificationUrl += '&signature=' + signature;
          transporter.sendMail({
            from: process.env.GOOGLE_ACOUNT_ADDRESS,
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
      let now = new Date();
      const hash = crypto
        .createHash('sha1')
        .update(result[0].email)
        .digest('hex');
      const isCorrectHash = hash === req.params.hash;
      now = now.toFormat('YY-MM-DD-HH24-MI-SS');
      const isExpired = now > parseInt(req.query.expires);
      const verificationUrl =
        process.env.APP_ORIGIN +
        req.originalUrl.split('&signature=')[0].split('users/')[1];
      const signature = crypto
        .createHmac('sha256', process.env.APP_KEY)
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
          res.json(JSON.stringify({msg: '本登録完了しました。'}));
        });
      }
    });
  },
  login: (req, res) => {
    User.readEmail(req.body.email, (error, result) => {
      let response = {}
      if(error) {
        response.result = false
        res.json(JSON.stringify(response));
        return
      }
      response.result = true;
      response.user = result;
      res.json(JSON.stringify(response));
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
  loginSns: (req, res) => {
    const response = {
      result: true
    }
    User.snsCreate(req.body, (error) => {
      if(error) {
        response.result = false;
      } 
      res.json(JSON.stringify(response));
    }) 
  }
};
