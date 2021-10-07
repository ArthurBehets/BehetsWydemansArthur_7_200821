var con = require('../connect');
var moment = require('moment');

exports.getArticleComment = (req, res, next) => {
    console.log(req.params.articleId);
    con.query(
        "SELECT * FROM comment natural JOIN user WHERE articleId= ?",
        [req.params.articleId],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (result){
                return res.status(200).json({result})
            }
        }
    )
}


exports.createComment = (req, res, next) => {
    var commentData = req.body;
    console.log(commentData);
    let publicationDate = moment().format('YYYY-MM-DD HH:mm:ss');
    con.query(
        "INSERT INTO comment (articleId, userid, message, publicationDate) VALUES (?,?,?,?)",
        [commentData.articleId, commentData.userId, commentData.message, publicationDate],
        function(err, result){
            if (err){
                return res.status(500).json({message : "Error"})
            }
            if (result){
                return res.status(200).json({message : "Created"})
            }
        }
    )
}

exports.modifyComment = (req, res, next) => {
    var commentNewData = req.body.comment;
    con.query(
        "UPDATE TABLE article SET message = ?",
        [commentNewData.message],
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

exports.deleteComment = (req, res, next) => {
    con.query(
        "DELETE * FROM comment WHERE commentId = ?",
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
