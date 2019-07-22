const article = require('../models/article')

class articleController{

    static createArticle(req, res, next){
        console.log('masuk ke controller create article')
        // console.log(req.decode.id)
        const newArticle = {
            title : req.body.title,
            content : req.body.content,
            // userId : req.decode.id
        }
        article.create(newArticle)
        .then(article =>{
            res.status(201).json(article)
        })
        .catch(next);
    }

    static readOwnArticle(req, res, next){
        article.find({
            where : { userId : req.decode.id }
        })
        .then(articles => {
            res.status(201).json(articles)
        })
        .catch(next)
    }

    static readAllArticle(req, res, next){
        article.find()
        .sort({created_at : -1})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static singleArticle(req, res, next){
        article.findByPk(req.params.id)
        .then(found => {
            if(!found){
                res.status(404).json({})
            }else{
                res.status(200).json(found)
            }
        })
        .catch(next)
    }

    static deleteArticle(req, res, next){
        article.findByPk(req.params.id)
        .then(article => {
            if(article){
                return article.destroy({
                    where : { id : req.params.id }
                })
            }else{
                throw({ code : 404})
            }
        })
        .then(deletedData => {
            res.status(200).json({ id : req.params.id })
        })
        .catch(next)
    }

    static updateArticle(req, res, next){
        article.findByPk(req.params.id)
        .then(article => {
            if(article){
                article.title = req.body.title || article.title
                article.content = req.body.content ||  article.content
            return article.save()
            } else {
                throw ({ code : 404})
            }
        })
        .then(updatedData => {
            res.status(200).json(updatedData)
        })
        .catch(next)
    }
}


module.exports = articleController