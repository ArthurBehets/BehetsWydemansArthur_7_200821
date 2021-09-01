const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/getAllComment', commentCtrl.getAllComment);
router.get('/getOneComment', commentCtrl.getOneComment);
router.post('/createComment', auth, multer, commentCtrl.createComment);
router.post('/modifyComment', auth, multer, commentCtrl.modifyComment);
router.post('/deleteComment', auth, multer, commentCtrl.deleteComment);
router.post('/likeComment', auth, commentCtrl.likeComment);


module.exports = router;