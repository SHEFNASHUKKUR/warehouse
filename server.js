const express = require('express')
const body_parser = require('body-parser');
const app = express();
app.use(body_parser.json());
var cors = require('cors');
app.use(cors());
const jwt = require("jsonwebtoken")
app.use(body_parser.urlencoded({
    extended: true
}));

const mysql = require('mysql')

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wdm'
})

// connect to MySQL

const accessTokenSecret = 'ohmygod';
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.status(200).json({"status":"0"})
    req.user = user.username
    next()
  })
}

app.post('/api/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user,pass);
    db.connect(function(err) {
        //if (err) throw err;
        db.query("SELECT * FROM department where email='"+user+"' and password='"+pass+"'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          const token = jwt.sign({ "username":result.username }, "ohmygod", { 		algorithm: "HS256", 		expiresIn: 3600, 	})
          console.log(token)
          res.status(200).json({'status':'success','token': token});
        });
      });
    
})

app.post('/api/adminlogin', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user,pass);
    db.connect(function(err) {
        if (err) throw err;
        db.query("SELECT * FROM admin where username='"+user+"' and password='"+pass+"'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          const token = jwt.sign({ "username":user }, "adminismyhero", { 		algorithm: "HS256", 		expiresIn: 3600, 	})
          console.log(token)
          res.status(200).json({'status':'success','token': token});
        });
      });
    
})

app.post('/api/managerinfo', function(req, res) {
  db.connect(function(err) {
    //if (err) throw err;
    db.query("SELECT * FROM department where username='"+req.user+"' ", function (err, result, fields) {
      res.status(200).json({'status':1,'info': fields});
    });
  });
    });

app.listen('3000', () => {
    console.log('server started on port 3000')
    
})