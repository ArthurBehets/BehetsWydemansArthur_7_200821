var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "myPassword24",
    database: "groupomania",
  });


exports.signup = (req, res, next) => {
    var userData = req.body.user;
    con.query(
        "INSERT INTO user (email, nom, prenom, password) VALUES (?,?,?,?)", 
        [userData.email, userData.nom, userData.prenom, userData.password],
        function(err, results) {
            console.log(results);
          }
    )
}

exports.login = (req, res, next) => {
    
}