const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller');
const contentValidation = require('../middleware/validator/contentValidator');
const passport = require('passport');
const jwtAuth = require('../middleware/auth/jwtAuth');

passport.use(jwtAuth);

router.get(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  commentController.read
);
router.get(
  '/edit/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.getEdit
);
router.post(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  contentValidation,
  commentController.create
);
router.put(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  contentValidation,
  commentController.update
);
router.delete(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.delete
);

module.exports = router;
