const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session'); // Import express-session

app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/viewsmentor'));
app.use(express.static(__dirname + '/public'));
const db = require('./db');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//student registration
app.post('/stdregistration',(req,res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let passwrd = req.body.password;
    let classno = req.body.classno;
    let query = "INSERT INTO students(firstname,lastname,email,mobile,password,class) VALUES('"+fname+"','"+lname+"','"+email+"','"+mobile+"','"+passwrd+"','"+classno+"')";
    db.query(query,(err,res)=>{
        if (!err){
        console.log("Inserted");
        }
        else {
            console.log(err);
        }
    });
   res.send("<h1>Succesfully Registered <br /> <p>Now login </p> </h1>");
});
// Session 
//Common stduent data
app.use(session({
    secret: 'abhi', // A secret key for session data encryption
    resave: false,
    saveUninitialized: true,
  }));
app.use((req, res, next) => {
    const studentID = req.session.studentID; // Get the studentID from the session
  
    // Fetch common student data based on the studentID
    const query = 'SELECT Firstname, email, mobile, class FROM students WHERE StudentID = ?';
    db.query(query, [studentID], (err, results) => {
      if (err) {
        console.error('Error fetching common student data:', err);
        return next(err); // Pass the error to the error-handling middleware
      }
      if (results.length > 0) {
        const commonStudentData = results[0];
        res.locals.commonStudentData = commonStudentData; // Make common student data available to all routes
        console.log('Common student data:', commonStudentData); // Add this line for debugging
    }
      next();
    });
  });


//student login 
app.post('/studentlogin', (req, res) => {
    
    let { Email, Password } = req.body;

    console.log(req.body);
    const query = `SELECT * FROM students WHERE Email = '${Email}'`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ message: 'An error occurred while checking login.' });
          }
        if (results.length === 1) {
        const stdid = results[0].StudentID;
        req.session.studentID = stdid;
        let getquery = `SELECT * FROM students WHERE StudentID = '${stdid}'`;
        db.query(getquery,(err,result)=>{
            console.log(result[0]);      
        if(!err){
            const commonStudentData = res.locals.commonStudentData;

             res.render('profile',{ data: commonStudentData});
             console.log(result[0].Firstname);
        }
        });

      } else {
        // Render an error page with EJS
        res.render('newlogin', { message: 'Invalid email or password' });
      }
    });
  });
  



 


 
//Get Requests and Responses
app.get('/login',(req,res) => {
    res.render('newlogin',{message : ''});
})

app.get('/',(req,res) => {
    console.log(req.method);
        res.render('first');
});
app.get('/first',(req,res) => {
    console.log(req.method);
        res.render('first');
});
app.get('/home',(req,res) => {
    console.log(req.method);
    res.render('first');
});
app.get('/profile',(req,res) => {
    console.log(req.method);
    const commonStudentData = res.locals.commonStudentData;
    res.render('profile',{ data: commonStudentData });


});


app.get('/dashboard',(req,res) => {
    console.log(req.method);
    res.render('dashboard');
});
app.get('/courses',(req,res) => {
    console.log(req.method);
    res.render('courses');
});
app.get('/coursevideo',(req,res) => {
    console.log(req.method);
    res.render('coursevideo');
});

app.get('/studymaterials',(req,res) => {
    console.log(req.method);
    res.render('studymaterials');
});
app.get('/NCERT',(req,res) => {
    console.log(req.method);
    res.render('NCERT');
});
app.get('/class12',(req,res) => {
    console.log(req.method);
    res.render('Class12');
});
app.get('/math',(req,res) => {
    console.log(req.method);
    res.render('math');
});
app.get('/math2',(req,res) => {
    console.log(req.method);
    res.render('math2');
});
app.get('/communication',(req,res) => {
    console.log(req.method);
    res.render('communication');
});
app.get('/loans',(req,res) => {
    console.log(req.method);
    res.render('loans');

});
app.get('/teacherprofile',(req,res) => {
    console.log(req.method);
    const commonStudentData = res.locals.commonStudentData;

    res.render('teacherprofile',{ data : commonStudentData });
});
app.get('/help',(req,res) => {
    console.log(req.method);
    res.render('help');
});

//mentor section requests and responses
app.get('/mentordashboard',(req,res) => {
    console.log(req.method);
        res.render('./viewsmentor/mentordashboard');
});
app.get('/mentorlogin',(req,res) => {
    console.log(req.method);
        res.render('./viewsmentor/mentorlogin');
});
// app.get('/mentorlogin',(req,res) => {
//     console.log(req.method);
//         res.sendFile(__dirname + '/viewsmentor/mentorlogin');
// });
//Public section
app.get('/public',(req,res) =>
{
    res.render('./public/jobs');

});
//Listening for requests
app.listen(3000,() => {
    console.log("Listening on 3000");
});


