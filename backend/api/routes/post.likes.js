const express = require('express');
const router = express.Router();
const postLikeController = require('../controller/post.like.controller');

router.post('/:user_id/:post_id', postLikeController.create);
router.delete('/delete/:user_id/:post_id', postLikeController.delete);

module.exports = router;