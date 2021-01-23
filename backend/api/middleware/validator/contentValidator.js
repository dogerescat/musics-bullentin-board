const { check } = require('express-validator');

module.exports = [
  check('body')
    .isLength({ max: 50 })
    .withMessage('コメントは50文字以下でないと投稿できません'),
];
