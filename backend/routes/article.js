const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/article');

router.get('/getAllArticle', articleCtrl.getAllArticle);
router.get('/getOneArticle/:id', auth, articleCtrl.getOneArticle);
router.get('/getOneCategory/:id', articleCtrl.getOneCategory);
router.get('/getAllCategories', articleCtrl.getAllCategories);
router.post('/createArticle', multer, articleCtrl.createArticle);
router.post('/modifyArticle', auth, multer, articleCtrl.modifyArticle);
router.post('/deleteArticle', auth, multer, articleCtrl.deleteArticle);
router.post('/likeArticle', auth, articleCtrl.likeArticle);


module.exports = router;