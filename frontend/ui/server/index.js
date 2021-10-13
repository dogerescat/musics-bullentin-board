const express = require('express');
const path = require('path');
const passport = require("passport");
require('dotenv').config();
const auth = require('./routes/auth');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const cookieParser = require('cookie-parser');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(cookieParser());

app.use(auth);

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT
});
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});
app.use(session({
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 30 * 60 * 1000
  }
}));

module.exports = {
  path: '/server',
  handler: app
}