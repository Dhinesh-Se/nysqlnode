'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'sql6.freemysqlhosting.net',
  user     : 'sql6636923',
  password : 'z94u9ZhMCs',
  database : 'sql6636923'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;