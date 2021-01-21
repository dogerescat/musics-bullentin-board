const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment.controller');

router.get('/:postId',commentController.read);
router.get('/edit/:commentId', commentController.getEdit);
router.post('/create/:postId', commentController.create);
router.put('/update/:commentId', commentController.update);
router.delete('/delete/:commentId', commentController.delete);

module.exports = router;