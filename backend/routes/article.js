const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/article');

router.get('/getAllArticle', auth, articleCtrl.getAllArticle);
router.get('/getOneCategory/:categoryName', auth, articleCtrl.getOneCategory);
router.get('/getAllCategories', auth, articleCtrl.getAllCategories);
router.post('/createArticle', auth, multer, articleCtrl.createArticle);
router.post('/modifyArticle', auth, multer, articleCtrl.modifyArticle);
router.post('/deleteArticle', auth, multer, articleCtrl.deleteArticle);
router.post('/addCategory/:categoryName', auth, articleCtrl.addCategory);
router.post('/deleteCategory/:categoryId', auth, articleCtrl.deleteCategory);
router.post('/likeArticle', auth, articleCtrl.likeArticle);
router.get('/getLikedArticles', auth, articleCtrl.getLikedArticles);



module.exports = router;