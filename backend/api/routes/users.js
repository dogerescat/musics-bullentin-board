const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const registerValidation = require('../middleware/validator/registerValidator');
const loginValidation = require('../middleware/validator/loginValidator');

router.post('/', registerValidation, userController.create);
router.get('/:id', userController.read);
router.get('/verify/:id/:hash', userController.signUp);
router.post('/login', loginValidation, userController.login);
router.get('/login/jwt', userController.loginJwt);
router.put('/:id/edit', userController.edit);
router.get('/logout', userController.logout);

module.exports = router;
