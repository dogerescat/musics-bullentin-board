const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = require('../middleware/auth/googleAuth');
const facebookAuth = require('../middleware/auth/facebookAuth');
const githubAuth = require('../middleware/auth/githubAuth');
const oauthController = require('../controller/oauth.controller');

passport.use(googleAuth);
passport.use(githubAuth);
passport.use(facebookAuth);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  oauthController.snsLogin
);
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email']})
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false}),
  oauthController.snsLogin
);
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  oauthController.snsLogin
);
router.get('/:sns/login', oauthController.setToken);

module.exports = router;
