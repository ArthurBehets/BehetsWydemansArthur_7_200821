const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/getArticleComment/:articleId', auth, commentCtrl.getArticleComment);
router.post('/createComment', auth, multer, commentCtrl.createComment);
router.post('/modifyComment', auth, multer, commentCtrl.modifyComment);
router.post('/deleteComment', auth, multer, commentCtrl.deleteComment);


module.exports = router;