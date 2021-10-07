const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const registerValidation = require('../middleware/validator/registerValidator');

router.post('/', registerValidation, userController.create);
router.get('/verify/:id/:hash', userController.signUp);
router.post('/login', userController.login);
router.post('/login/sns', userController.loginSns);
router.get('/login/jwt', userController.loginJwt);
router.get('/:id', userController.read);
router.put('/:id/edit', userController.edit);

module.exports = router;
