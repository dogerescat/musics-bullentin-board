const express = require('express');
const router = express.Router();
const postLikeController = require('../controller/post.like.controller');
const passport = require('passport');
const jwtAuth = require('../middleware/auth/jwtAuth');

passport.use(jwtAuth);

router.post('/:userId/:postId', passport.authenticate('jwt', { session: false }), postLikeController.create);
router.delete('/delete/:userId/:postId', passport.authenticate('jwt', { session: false }) ,postLikeController.delete);

module.exports = router;