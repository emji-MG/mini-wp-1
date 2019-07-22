const router = require('express').Router()
const articleController = require('../controllers/articleController')

// router.get()
router.post('/createArticle', articleController.createArticle)
router.get('/readAllArticle', articleController.readAllArticle)
router.get('/readOwnArticle', articleController.readOwnArticle)
router.delete('/deleteArticle', articleController.deleteArticle)
router.get('/singleArticle', articleController.singleArticle)
router.patch('/updateArticle', articleController.updateArticle)



module.exports = router