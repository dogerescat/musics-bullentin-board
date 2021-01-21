const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const passport = require('passport');
const jwtAuth = require('../middleware/auth/jwtAuth');

passport.use(jwtAuth);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.read
);
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  postController.create
);
router.get(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  postController.getEdit
);
router.put(
  '/update/:id',
  passport.authenticate('jwt', {session: false}),
  postController.update
);
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', {session: false}),
  postController.delete
)
module.exports = router;
