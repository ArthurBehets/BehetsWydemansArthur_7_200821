var con = require('../connect');
var moment = require('moment');
var fs = require('fs');

exports.getAllArticle = (req, res, next) => {
    con.query(
        "SELECT * FROM article natural JOIN user  ORDER BY publicationDate DESC",
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

exports.getOneArticle = (req, res, next) => {
    con.query(
        "SELECT * FROM article WHERE articleId = ?",
        [req.params.id],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (result){
                return res.status(200).json({message : "You got this one"})
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
        "SELECT * FROM article WHERE categoryId = ?",
        [req.body.categoryId],
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
    console.log(articleData);
    let publicationDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // TODO vérifier les donnees
    let url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log(url);
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

exports.modifyArticle = (req, res, next) => {
    var articleNewData = req.body.article;
    con.query(
        "UPDATE TABLE article SET url = ? legend = ?",
        [`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, articleNewData.legend],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Error"})
            }
            if (result){
                return res.status(200).json({message : "Updated"})
            }
        }
    )
}

exports.deleteArticle = (req, res, next) => {
    con.query(
        "DELETE * FROM article WHERE articleId = ?",
        [req.body],
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

exports.likeArticle = (req, res, next) => {
    //ok
}