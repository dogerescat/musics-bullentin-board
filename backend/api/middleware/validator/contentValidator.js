const { check } = require('express-validator');

module.exports = [
  check('body')
    .isLength({ max: 124 })
    .withMessage('コメントは124文字以下でないと投稿できません'),
];
