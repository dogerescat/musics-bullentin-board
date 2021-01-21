const express = require('express');
const router = express.Router();
const postLikeController = require('../controller/post.like.controller');

router.post('/:userId/:postId', postLikeController.create);
router.delete('/delete/:userId/:postId', postLikeController.delete);

module.exports = router;