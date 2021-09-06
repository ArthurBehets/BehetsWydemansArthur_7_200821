const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "myPassword24",
    database: "groupomania",
  });
  

  module.exports = con;