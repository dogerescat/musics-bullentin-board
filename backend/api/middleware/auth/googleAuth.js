const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
const env = process.env;
const User = require('../../model/user');

module.exports = new GoogleStrategy(
  {
    clientID: env.GOOGLE_CLIENT_KEY,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/oauth/google/callback',
  },
  function (token, tokenSecret, profile, done) {
    User.snsFindEmail({ email: profile.emails[0].value }, (err, user) => {
      if (user.length === 0) {
        User.snsCreate(profile, () => {
          User.snsFindEmail({ email: profile.emails[0].value }, (e, users) => {
            return done(e, users[0]);
          });
        });
      } else if (!user[0].sns) { 
        return done(null, user[0], {
          message: `このメールアドレスは別のアカウントに使用されています。`,
        });
      } else if (user[0].sns !== profile.provider) {
        return done(null, user[0], {
          message: `このメールアドレスは${user[0].sns}のアカウントに使用されています。`,
        });
      } else {
        return done(err, user[0]);
      }
    });
  }
);
