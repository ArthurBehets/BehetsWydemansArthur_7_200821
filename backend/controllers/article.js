var con = require('../connect');
var moment = require('moment');
var fs = require('fs');

exports.getAllArticle = (req, res, next) => {
    con.query(
        "SELECT * FROM article natural JOIN user ORDER BY publicationDate DESC",
        function(err, results){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (results){
                return res.status(200).json({results})
            }
        }
    )
}

exports.getAllCategories = (req, res, next) => {
    con.query(
        "SELECT * from category",
        function(err, results){
            if(err){
                res.status(500).json({message : "Nothing found"})
            }
            if(results){
                res.status(200).json({results})
            }
        }
    )
}

exports.getOneCategory = (req, res, next) => {
    con.query(
        "SELECT * FROM article natural JOIN user natural JOIN category WHERE categoryName = ? ORDER BY publicationDate DESC",
        [req.params.categoryName],
        function(err, results){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (results){
                return res.status(200).json({results})
            }
        }
    )
}

exports.createArticle = (req, res, next) => {
    var articleData = req.body;
    let publicationDate = moment().format('YYYY-MM-DD HH:mm:ss');
    let url = '';
    let imgUrl = req.file? {
        ... (`${req.protocol}://${req.get('host')}/images/${req.file.filename}`),
    } : {
        ...('null')
    }
    
    for(i in imgUrl){
        url += imgUrl[i];
    }
    if(url == 'null'){
        con.query(
            "INSERT INTO article (userId, categoryId, legend, publicationDate) VALUES (?,?,?,?)",
            [articleData.userId, articleData.categoryId, articleData.legend, publicationDate],
            function(err, result){
                if (err){
                    return res.status(500).json({message : "Nothing added"})
                }
                if (result){
                    return res.status(200).json({message : "Nicely added"})
                }
            }
        )
    }
    else{
        con.query(
            "INSERT INTO article (userId, categoryId, url, legend, publicationDate) VALUES (?,?,?,?,?)",
            [articleData.userId, articleData.categoryId, url, articleData.legend, publicationDate],
            function(err, result){
                if (err){
                    return res.status(500).json({message : "Nothing added"})
                }
                if (result){
                    return res.status(200).json({message : "Nicely added"})
                }
            }
        )
    }
}

exports.modifyArticle = (req, res, next) => {
    let url = '';
    let imgUrl = req.file? {
        ... (`${req.protocol}://${req.get('host')}/images/${req.file.filename}`),
    } : {
        ...('null')
    }
    
    for(i in imgUrl){
        url += imgUrl[i];
    }
    if(url != 'null'){
        con.query(
            "UPDATE article SET url = ? WHERE articleId = ?",
            [url, req.body.articleId],
        )
    }
    if(req.body.legend != ''){
        con.query(
            "UPDATE article SET legend = ? WHERE articleId = ?",
            [req.body.legend, req.body.articleId]
        )
    }
    if(req.body.legend != ''){
        con.query(
            "UPDATE article SET legend = ? WHERE articleId = ?",
            [req.body.legend, req.body.articleId]
        )
    }
    if(req.body.categoryId != ''){
        con.query(
            "UPDATE article SET categoryId = ? WHERE articleId = ?",
            [req.body.categoryId, req.body.articleId]
        )
    }
    return res.status(200).json(message = 'ok');
}

exports.deleteArticle = (req, res, next) => {
    con.query(
        "DELETE FROM article WHERE articleId = ?",
        [req.body.articleId],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Error"})
            }
            if (result){
                return res.status(200).json({message : "Deleted"})
            }
        }
    )
}

exports.addCategory = (req, res, next) => {
    con.query(
        "insert into category (categoryName) values (?)",
        [req.params.categoryName],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Error"})
            }
            if (result){
                return res.status(200).json({message : "Added"})
            }
        }
    )
}

exports.deleteCategory = (req, res, next) => {
    con.query(
        "delete from category where categoryId = ?",
        [req.params.categoryId],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Error"})
            }
            if (result){
                return res.status(200).json({message : "Added"})
            }
        }
    )
}

exports.likeArticle = (req, res, next) => {
    console.log(req.body.myBody)
    if(req.body.myBody.liked === false){
        con.query(
            "UPDATE article SET likes = (likes +1) WHERE articleId = ?",
            [req.body.myBody.articleId]
        )
        con.query(
            "insert into articleUserLiked (articleId, userId) values (?,?)",
            [req.body.myBody.articleId, req.body.myBody.userId],
            function(err, result){
                if (err){
                    return res.status(500).json({message : "Article déjà liké"})
                }
                if (result){
                    return res.status(200).json({message : "Liked"})
                }
            }
        )
    }
    else if(req.body.myBody.liked === true){
        con.query(
            "UPDATE article SET likes = (likes -1) WHERE articleId = ?",
            [req.body.myBody.articleId]
        )
        con.query(
            "delete from articleUserLiked where articleId = ? AND userId = ?",
            [req.body.myBody.articleId, req.body.myBody.userId],
            function(err, result){
                if (err){
                    return res.status(500).json({message : "Error"})
                }
                if (result){
                    return res.status(200).json({message : "Disliked"})
                }
            }
        )
    }
}

exports.getLikedArticles = (req, res, next) => {
    con.query(
        "SELECT * FROM articleUserLiked",
        function(err, results){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (results){
                return res.status(200).json({results})
            }
        }
    )
}