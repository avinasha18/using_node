// Database Connection
const mysql = require('mysql');
const connection = mysql.createConnection({
    
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'mydb',
    multipleStatements : true
});
connection.connect((err) =>{
    if (err){
        console.log("Connecting Eroor",err);
    }
    else {
        console.log("Connected");
    }
});
module.exports = connection;