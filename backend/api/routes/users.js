const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const registerValidation = require('../middleware/validator/registerValidator');
const loginValidation = require('../middleware/validator/loginValidator');

router.post('/', registerValidation, userController.create);
router.get('/verify/:id/:hash',userController.realSignUp);
router.post('/login', loginValidation, userController.login);
router.get('/login/jwt', userController.loginJwt);
router.get('/logout', userController.logout);

module.exports = router;
