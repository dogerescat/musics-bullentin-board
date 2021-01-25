const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../model/user');
require('dotenv').config();
const env = process.env;

module.exports = new TwitterStrategy(
  {
    consumerKey: env.TWITTER_CONSUMER_KEY,
    consumerSecret: env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/api/oauth/twitter/callback",
    includeEmail: true
  },
  function (token, tokenSecret, profile, done) {
    User.snsFindEmail({ email: profile.emails[0].value }, function (err, user) {
      if (user.length === 0) {
        User.snsCreate(profile, () => {
          User.snsFindEmail({ email: profile.emails[0].value}, (e, users) => {
            return done(e, users[0]);
          });
        }); 
      } else if(user[0].sns !== profile.provider) {  
        return done(null, user[0], { message: `このメールアドレスは${user[0].sns}のアカウントに使用されています。`});
      } else {
        return done(err, user[0]);
      };
    });
  }
);
