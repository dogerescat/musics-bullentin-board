const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const passport = require("passport");
const loginValidator = require('./middleware/validator/loginValidator');
const googleAuth = require('./middleware/auth/googleAuth');
const githubAuth = require('./middleware/auth/githubAuth');
require('dotenv').config();
const authController = require('./controller/auth.controller');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const cookieParser = require('cookie-parser');

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(cookieParser());

passport.use(googleAuth);
passport.use(githubAuth);

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

app.use(session({
  key: process.env.SECRET_KEY,
  store: new RedisStore({client: redisClient}),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 30 * 60 * 1000
  }
}));
app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.snsLogin
);
app.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
app.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  authController.snsLogin
);
app.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  authController.snsLogin
);
app.get('/signup/:id',
  authController.signUp
);
app.post(
  '/login',
  loginValidator,
  authController.login
);
app.get(
  '/login/jwt',
  authController.loginJwt
);
app.get(
  '/logout',
  authController.logout
);

module.exports = {
  path: '/server',
  handler: app
}