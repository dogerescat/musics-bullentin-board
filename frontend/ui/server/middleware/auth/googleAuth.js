const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
const baseAxios = require('axios');
const axios = baseAxios.create({
  baseURL: 'http://backend:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'  
});


module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_KEY,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.APP_ORIGIN}server/google/callback`,
  },
  async function (token, tokenSecret, profile, done) {
    let res = await axios.post("/api/v1/users/login", profile);
    res = JSON.parse(res.data);
    if (!res.data.length) {
      res = await axios.post("/api/v1/users/login/sns", profile);
      res = JSON.parse(res.data);
      if (!res.result) {
        return done(null, null, {result: false});
      }
      res = await axios.post("/api/v1/users/login", profile);
      res = JSON.parse(res.data);
      return done(null, res.data[0],{
        message: "ログインしました",
        result : true
      });
    } else if (res.data[0].sns != profile.provider) {
      if (!res.data[0].sns) {
        return done(null, res.data[0], {
          message: `このメールアドレスは別のアカウントに使用されています。`,
          result: false

        });
      }
      return done(null, res.data[0], {
        message: `このメールアドレスは${res.data[0].sns}のアカウントに使用されています。`,
        result: false
      });
    } else {
      return done(null, res.data[0], {
        message: "ログインしました",
        result: true
      });
    }
  }
);
