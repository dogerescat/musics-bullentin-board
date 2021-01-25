const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = require('../middleware/auth/googleAuth');
const twitterAuth = require('../middleware/auth/twitterAuth');
const oauthController = require('../controller/oauth.controller');

passport.use(googleAuth);
passport.use(twitterAuth);

router.get('/google', passport.authenticate('google', { scope:  ['email', 'profile']}));
router.get('/google/callback', passport.authenticate('google', { session: false }), oauthController.snsLogin);
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { session: false }), oauthController.snsLogin);

module.exports = router;