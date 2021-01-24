const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = require('../middleware/auth/googleAuth');
const oauthController = require('../controller/oauth.controller');

passport.use(googleAuth);

router.get('/google', passport.authenticate('google', { scope:  ['email', 'profile']}));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/api/users/login'}), oauthController.snsLogin);

module.exports = router;