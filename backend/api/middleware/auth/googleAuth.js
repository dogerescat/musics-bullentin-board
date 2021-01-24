const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// require('dotenv').config();
// const env = process.env;
const User = require('../../model/user');

module.exports = new GoogleStrategy(
  {
    clientID: '321065443441-22c8rscuq09lat0c8kd9gg7arcv5juhp.apps.googleusercontent.com',
    clientSecret: 'na2xf6tCX-jYEI_KaREbonvQ',
    callbackURL: 'http://localhost:3000/api/oauth/google/callback',
  },
  function (token, tokenSecret, profile, done) {
    User.snsFindEmail({ email: profile.emails[0].value }, function (err, user) {
      if (user.length === 0) {
        User.snsCreate(profile, () => {
          User.snsFindEmail({ email: profile.emails[0].value}, (e, users) => {
            return done(e, users[0]);
          });
        }); 
      } else {
        return done(err, user[0]);
      };
    });
  }
);
