const express = require('express');
const router = express.Router();
const commentLikeController = require('../controller/comment.like.controller');

router.post('/:commentId/:userId', commentLikeController.create);
router.delete('/delete/:commentId/:userId',commentLikeController.delete);

module.exports = router;