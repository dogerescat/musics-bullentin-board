const express = require('express');
const router = express.Router();
const commentLikeController = require('../controller/comment.like.controller');
const passport = require('passport');
const jwtAuth = require('../middleware/auth/jwtAuth');

passport.use(jwtAuth);

router.post(
  '/:commentId/:userId',
  passport.authenticate('jwt', { session: false }),
  commentLikeController.create
);
router.delete(
  '/delete/:commentId/:userId',
  passport.authenticate('jwt', { session: false }),
  commentLikeController.delete
);

module.exports = router;
