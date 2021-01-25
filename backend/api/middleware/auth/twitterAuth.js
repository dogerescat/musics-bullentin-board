const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../model/user');

module.exports = new TwitterStrategy(
  {
    consumerKey: '45r1t0f1uYVZENKbj13dk74Sd',
    consumerSecret: 'f2ZkexUrjLqe3uNgWUFkJ9JJrq3niHJKQubKtky3B4ewqdwU79',
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
