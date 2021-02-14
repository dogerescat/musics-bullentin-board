const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../model/user');
require('dotenv').config();

module.exports = new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.ORIGIN}api/v1/oauth/facebook/callback`,
      profileFields: ['displayName', 'email']
    },
    function (token, tokenSecret, profile, done) {
      User.snsFindEmail({ email: profile.emails[0].value }, function (err, user) {
        if(err) {
          return done(null, user[0], { message: 'エラーが発生しました。'});
        }
        if (user.length === 0) {
          User.snsCreate(profile, () => {
            User.snsFindEmail({ email: profile.emails[0].value }, (e, users) => {
              return done(e, users[0]);
            });
          });
        } else if (!user[0].sns) { 
          return done(null, user[0], {
            message: `このメールアドレスは別のアカウントに使用されています。`
          });
        } else if (user[0].sns !== profile.provider) {
          return done(null, user[0], {
            message: `このメールアドレスは${user[0].sns}のアカウントに使用されています。`
          });
        } else {
          return done(err, user[0]);
        }
      });
    }
  );
  