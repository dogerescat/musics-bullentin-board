const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const registerValidation = require('../middleware/validator/registerValidator');
const loginValidation = require('../middleware/validator/loginValidator');

router.get('/verify/:id/:hash',userController.realSignUp);
router.post('/', registerValidation, userController.create);
router.post('/login', loginValidation, userController.login);

module.exports = router;
