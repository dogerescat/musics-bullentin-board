const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../model/user');
require('dotenv').config();
const env = process.env;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.SECRET_KEY;
opts.algorithms = 'HS256';

module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne(jwt_payload.email, jwt_payload.password, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
