var con = require('../connect');
var moment = require('moment');

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

exports.getCategory = (req, res, next) => {
    con.query(
        "SELECT * FROM article WHERE articleCategory = ?",
        [req.body.articleCategory],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (result){
                return res.status(200).json({message : "You got all the category"})
            }
        }
    )
}

exports.createArticle = (req, res, next) => {
    var articleData = req.body;
    let publicationDate = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(articleData);
    // TODO vérifier les datas
    con.query(
        "INSERT INTO article (userId, categoryId, url, legend, publicationDate) VALUES (?,?,?,?,?)",
        [articleData.userId, articleData.categoryId, articleData.url, articleData.legend, publicationDate],
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