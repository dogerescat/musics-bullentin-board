const { Router } = require('express');
const router = Router();
const passport = require('passport');
const loginValidator = require('../middleware/validator/loginValidator');
const googleAuth = require('../middleware/auth/googleAuth');
const githubAuth = require('../middleware/auth/githubAuth');
const authController = require('../controller/auth.controller');

passport.use(githubAuth);
passport.use(googleAuth);



router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    authController.snsLogin
  );
  router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  router.get(
    "/github/callback",
    passport.authenticate("github", { session: false }),
    authController.snsLogin
  );
  router.get('/signup/:id',
    authController.signUp
  );
  router.post(
    '/login',
    loginValidator,
    authController.login
  );
  router.get(
    '/login/jwt',
    authController.loginJwt
  );
  router.get(
    '/logout',
    authController.logout
  );
  

module.exports = router;
