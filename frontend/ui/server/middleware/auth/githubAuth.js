const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();
const baseAxios = require("axios");
const axios = baseAxios.create({
  baseURL: process.env.APP_URL, 
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  responseType: "json"
});

module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.APP_ORIGIN}server/github/callback`,
    scope: ["user:email"]
  },
  async (token, tokenSecret, profile, done) => {
    let res = await axios.post("/api/v1/users/login", { email: profile.emails[0].value });
    res = JSON.parse(res.data);
    if (!res.user.length) {
      res = await axios.post("/api/v1/users/login/sns", profile);
      res = JSON.parse(res.data);
      if (!res.result) {
        return done(null, null, {result: false});
      }
      res = await axios.post("/api/v1/users/login", { email: profile.emails[0].value });
      res = JSON.parse(res.data);
      return done(null, res.user[0],{
        message: "ログインしました",
        result : true
      });
    } else if (res.user[0].sns != profile.provider) {
      if (!res.user[0].sns) {
        return done(null, res.user[0], {
          message: `このメールアドレスは別のアカウントに使用されています。`,
          result: false

        });
      }
      return done(null, res.user[0], {
        message: `このメールアドレスは${res.user[0].sns}のアカウントに使用されています。`,
        result: false
      });
    } else {
      return done(null, res.user[0], {
        message: "ログインしました",
        result: true
      });
    }
  }
);
