const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const passport = require('passport');
const jwtAuth = require('../middleware/auth/jwtAuth');

passport.use(jwtAuth);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.get
);
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  postController.create
);

module.exports = router;
