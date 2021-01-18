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

app.post('/api/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user,pass);
    db.connect(function(err) {
        if (err) throw err;
        db.query("SELECT * FROM department where email='"+user+"' and password='"+pass+"'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          const token = jwt.sign({ "username":user }, "ohmygod", { 		algorithm: "HS256", 		expiresIn: 3600, 	})
          console.log(token)
          res.status(200).json({'status':'success','token': token});
        });
      });
    
})

app.listen('3000', () => {
    console.log('server started on port 3000')
    
})