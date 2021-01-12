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

module.exports = {
  create: (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
      return res.json(validationErrors.errors[0].msg);
    }
    const salt = bcrypt.genSaltSync(8)
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    User.checkEmail(req.body.email, (err, re) => {
      if(!re.length === 0) {
        return res.json({ message: '既に登録されています' });
      }
      User.create(req.body, hashPassword, (error, result) => {
        if(error) {
          return res.status(422).json({message: '登録できませんでした'});
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
          return res.json({
            result: true,
            message: 'メールを送信しました。' 
          });

        })
      })
    })
  },
  realSignUp: (req, res) => {
    const id = req.params.id
    User.checkUserId(id, (error, result) => {
      if(result.length === 0) {
        let message = {msg: 'このurlは正しくありません。'}
        message = JSON.stringify(message);
        return res.json(message);
      } else if(result[0].emailVerifiedAt) {
        let message = {msg: '本登録済みです'}
        message = JSON.stringify(message);
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
          let message = {msg: 'このURLはすでに有効期限切れか、正しくありません。'}
          message = JSON.stringify(message);
          return res.json(message);  
        } else {  
          User.addEmailVerifiedAt(now, id, (err, resu) => {
            if(err) {
              let message = {msg: '本登録できませんでした。'}
              message = JSON.stringify(message);
              return res.json(message);  
            }
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
            data.url = '/posts'
            data.msg = '本登録完了しました。'
            data = JSON.stringify(data);
            res.json(data);
          })
        }
    })
  },
  login: (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
      return res.json(validationErrors.errors[0].msg);
    }
    User.checkEmail(req.body.email, (error, result) => {
      if(result[0].length === 0) {
        let message = {msg: 'ユーザーが見つかりません。'}
        message = JSON.stringify(message);
        return res.json(message);
      } else if(!bcrypt.compareSync(req.body.password, result[0].password)) {
        let message = {msg: 'パスワードが正しくありません。'}
        message = JSON.stringify(message);
        return res.json(message)
      }
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
