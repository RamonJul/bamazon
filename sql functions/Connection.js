var mysql=require("mysql")
var connection=mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'bamazon_db'
  });

  connection.connect()

  module.exports=connection
   