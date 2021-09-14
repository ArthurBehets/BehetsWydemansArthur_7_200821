var con = require('../connect');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

require('dotenv').config();

const testMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

exports.signup = (req, res, next) => {
  var userData = req.body.user;
  //TODO vérifier les données de userData
  if(testMail.test(userData.email)){
    if(8 < userData.password< 21){
      con.query(
        "INSERT INTO user (email, password, lastname, firstname, grade) VALUES (?,?,?,?,?)", 
        [userData.email, userData.password, userData.lastname, userData.firstname, userData.grade],
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
    "SELECT password, userId, grade FROM user WHERE email = ?",
    [userData.email],
    function(err, results){
      if(results[0].password == userData.password){
        console.log(results);
        return res.status(200).json({
          console : "connected",
          userId: results[0].userId,
          grade: results[0].grade,
            token: jwt.sign( 
              { "userId": results[0].userId},
              `${process.env.ACCESS_SECRET_TOKEN}`,
              { expiresIn: '24h' })
        })
      }
      if(err){
        return res.status(500).json({
          console : "Mot de passe incorrect"
        })
      }
    })
}