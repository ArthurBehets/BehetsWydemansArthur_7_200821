var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "myPassword24",
    database: "groupomania",
  });


exports.getAllComment = (req, res, next) => {
    con.query(
        "SELECT * FROM comment",
        function(err, result){
            if (err){
                return res.status(500).json({message : "Nothing found"})
            }
            if (result){
                return res.status(200).json({result, message : "You got them all"})
            }
        }
    )
}

exports.getOneComment = (req, res, next) => {
    con.query(
        "SELECT * FROM commentary WHERE commentId= ?",
        [req.body.articleId],
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


exports.createComment = (req, res, next) => {
    var commentData = req.body.comment;
    // TODO vérifier les datas
    con.query(
        "INSERT INTO comment (commentId, postId, userid, message, likes) VALUES (?,?,?,?,0)",
        [commentData.commentId, commentData.postId, commentData.userId, commentData.message],
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

exports.likeComment = (req, res, next) => {
    //ok
}