const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/viewsmentor'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./db');
// app.post('/stdregistration',(req,res) => {
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let email = req.body.email;
//     let mobile = req.body.mobile;
//     let passwrd = req.body.password;
//     let classno = req.body.classno;
//     let query = "INSERT INTO students(firstname,lastname,email,mobile,password,class) VALUES('"+fname+"','"+lname+"','"+email+"','"+mobile+"','"+passwrd+"','"+classno+"')";
//     db.query(query,(err,res)=>{
//         if (!err){
//         console.log("Inserted");
//         res.redirect('/dashboard');

//         }
//         else {
//             console.log(err);
//         }
//     });
//     console.log("Function called");
// });