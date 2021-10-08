const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const postRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const postLikeRouter = require('./routes/post.likes');
const commentRouter = require('./routes/comments');
const commnetLikeRouter = require('./routes/comment.likes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/post/likes', postLikeRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/comment/likes', commnetLikeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});
module.exports = app;
