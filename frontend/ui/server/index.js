const express = require('express');
const app = express();

const path = require('path');
const passport = require("passport");

require('dotenv').config();
const auth = require('./routes/auth');

const port = process.env.PORT || 3000;

app.set('port', port)

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
// app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(cookieParser());

app.use(auth);

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  // host: 'redis',
  // port: 6379
})
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

app.use(session({
  key: process.env.SECRET_KEY,
  store: new RedisStore({
    url: process.env.REDIS_URL,
    client: redisClient
  }),
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

module.exports = app;
const port = process.env.PORT || 3000
app.listen(port, () => {
    // eslint-disable-next-line no-console
  console.log(`API server listening on port ${port}`)
});
// module.exports = {
//   path: '/server',
//   handler: app
// }