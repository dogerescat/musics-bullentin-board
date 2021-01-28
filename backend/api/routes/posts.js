const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const passport = require('passport');
const jwtAuth = require('../middleware/auth/jwtAuth');
const contentValidation = require('../middleware/validator/contentValidator');

passport.use(jwtAuth);

router.get(
  '/',
  passport.authenticate('jwt', { session: false  }),
  postController.read
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false  }),
  contentValidation,
  postController.create
);
router.get(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.getEdit
);
router.get(
  '/search/category/:category',
  passport.authenticate('jwt', { session: false }),
  postController.searchCategory
);
router.get(
  '/search/artist/:artist', 
  passport.authenticate('jwt', { session: false }),
  postController.searchArtist
);
router.put(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  contentValidation,
  postController.update
);
router.delete(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.delete
);

module.exports = router;
