var mysql = require('mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "myPassword24",
    database: "groupomania",
  });

const testMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

exports.signup = (req, res, next) => {
  var userData = req.body.user;
  //TODO vérifier les données de userData
  if(testMail.test(userData.email)){
    if(8 < userData.password< 21){
      con.query(
        "INSERT INTO user (email, password, name, firstName) VALUES (?,?,?,?)", 
        [userData.email, userData.password, userData.name, userData.firstName],
        function(err, results) {
            if(err){
              return res.status(500).json({console : "Cet email est déjà enregistré"});
            }
            if(results){
              return res.status(200).json({console : "Signed up"});
            }
        }
      )
    }
  }
}

exports.login = (req, res, next) => {
  var userData = req.body.user;
  con.query(
    "SELECT * FROM user WHERE email = ?",
    [userData.email],
    function(err, results){
      if(results[0].password == userData.password){
        return res.status(200).json({
          console : "connected",
          userId: results[0].userId,
            token: jwt.sign( 
              { userId: results[0].userId },
              require('crypto').randomBytes(64).toString('hex'),
              { expiresIn: '24h' }
            )
        })
      }
      else{
        return res.status(500).json({message : "Le mot de passe est incorrect."})
      }
    })
}