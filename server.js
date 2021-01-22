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
    req.user = user.email
    req.deptid=user.deptid
    next()
  })
}




const adminTokenSecret = 'adminismyhero';
function authenticateTokenadmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, adminTokenSecret, (err, user) => {
    if (err) return res.status(200).json({"status":"0"})
    req.admin = user.username
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
          //if (err) throw err;
          console.log(result[0].email);
          const token = jwt.sign({ "email":result[0].email,"deptid":result[0].deptid }, "ohmygod", { 		algorithm: "HS256", 		expiresIn: 3600, 	})
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
        //if (err) throw err;
        db.query("SELECT * FROM admin where username='"+user+"' and password='"+pass+"'", function (err, result, fields) {
          //if (err) throw err;
          console.log(result);
          const token = jwt.sign({ "username":result[0].username }, "adminismyhero", { 		algorithm: "HS256", 		expiresIn: 3600, 	})
          console.log(token)
          res.status(200).json({'status':'1','token': token});
        });
      });
    
})

app.post('/api/managerinfo',authenticateToken, function(req, res) {
  db.connect(function(err) {
    //if (err) throw err;
    console.log(req.user);
    db.query("SELECT * FROM department where email='"+req.user+"' ", function (err, result, fields) {
      res.status(200).json({'status':1,'info': result[0].name});
    });
  });
    });



    app.post('/api/admininfo',authenticateTokenadmin, function(req, res) {
      db.connect(function(err) {
        //if (err) throw err;
       
        db.query("SELECT * FROM admin where username='"+req.admin+"' ", function (err, result, fields) {
          res.status(200).json({'status':1,'info': result[0].username});
        });
      });
        });



          //copied

        app.post('/api/managerlist',authenticateTokenadmin, function(req, res) {
          db.connect(function(err) {
            //if (err) throw err;
           
            db.query("SELECT g.regid,g.title,g.city,d.name,d.contact FROM godown g,department d WHERE g.regid = d.regid", function (err, result, fields) {
              res.status(200).json({'status':1,'info': result});
            });
          });
            });




            app.post('/api/rfid',authenticateToken, function(req, res) {
              db.connect(function(err) {
                //if (err) throw err;
               
                db.query("SELECT item,action,quantity,date,time FROM rfid r, registration d where r.tagid=d.tagid;", function (err, result, fields) {
                  res.status(200).json({'status':1,'info': result});
                });
              });
                });


                app.get('/api/tagread', function(req, res) {
                  var id = req.query.id

                      var today = new Date();
                      var dd = today.getDate();

                      var mm = today.getMonth()+1; 
                      var yyyy = today.getFullYear();
                      if(dd<10) 
                        {
                      dd='0'+dd;
                        } 

                        if(mm<10) 
                        {
                         mm='0'+mm;
                        } 
                        today = yyyy+'-'+mm+'-'+dd;




                        given_seconds = 3685; 

  

            dateObj = new Date(given_seconds * 1000); 

            hours = dateObj.getUTCHours(); 

            minutes = dateObj.getUTCMinutes(); 

            seconds = dateObj.getSeconds(); 

  

            timeString = hours.toString().padStart(2, '0') 

                + ':' + minutes.toString().padStart(2, '0') 

                + ':' + seconds.toString().padStart(2, '0');

                  db.connect(function(err) {
                    //if (err) throw err;
                   sql="INSERT INTO `rfid`(`tagid`, `action`, `date`, `time`) VALUES ('"+id+"','0','"+today+"','"+timeString+"')"
                   console.log(sql)
                    db.query(sql, function (err, result, fields) {
                     
                    });
                    sql1="UPDATE `rfid` SET `action`=1 WHERE tagid='"+id+"'"
                    console.log(sql1)
                    db.query(sql1, function (err, result, fields) {
                     
        });
        res.status(200).json({'status':1});
                    

                  });
});



//tagassign
app.post('/api/tagassign',authenticateToken, function(req, res) {
  var tagnumber=req.body.tagnumber
  var item=req.body.item
  var quantity=req.body.quantity
  db.connect(function(err) {
    //if (err) throw err;
    console.log(req.user);
    sql2="INSERT INTO `registration`(`tagid`, `item`, `quantity`) VALUES ('"+tagnumber+"','"+item+"','"+quantity+"')"
    db.query(sql2, function (err, result, fields) {
      res.status(200).json({'status':1});
    });
  });
    });


    app.post('/api/tagshow',authenticateToken, function(req, res) {
      db.connect(function(err) {
        //if (err) throw err;
       
        db.query("SELECT tagid,item,quantity from registration", function (err, result, fields) {
          res.status(200).json({'status':1,'info': result});
        });
      });
});


app.post('/api/stockshow',authenticateToken, function(req, res) {
  db.connect(function(err) {
    //if (err) throw err;
   
    db.query("SELECT coomodity,capacity from cdetails where deptid="+req.deptid, function (err, result, fields) {
      res.status(200).json({'status':1,'info': result});
    });
  });
    });


//commodity adding
app.post('/api/commodityadd',authenticateToken, function(req, res) {
  var commodity=req.body.commodity
  var quantity=req.body.quantity
  db.connect(function(err) {
    //if (err) throw err;
    console.log(req.user);
    sql2="INSERT INTO `cdetails`(`deptid`, `coomodity`, `capacity`) VALUES ('"+req.deptid+"','"+commodity+"','"+quantity+"')"
    db.query(sql2, function (err, result, fields) {
      res.status(200).json({'status':1});
    });
  });
    });

   //add godown
   app.post('/api/addgodown',authenticateTokenadmin, function(req, res) {
    var regid=req.body.regid
    var title=req.body.title
    var district=req.body.district
    var capacity=req.body.capacity
    db.connect(function(err) {
      //if (err) throw err;
      console.log(req.user);
      sql2="INSERT INTO `godown`(`regid`, `title`, `city`, `capacity`) VALUES ('"+regid+"','"+title+"','"+district+"','"+capacity+"')"
      console.log(sql2)
      db.query(sql2, function (err, result, fields) {
        res.status(200).json({'status':1});
      });
    });
      });
   
   //add manager
   app.post('/api/addmanager',authenticateTokenadmin, function(req, res) {
    var deptid=req.body.deptid
    var name=req.body.name
    var email=req.body.email
    var regid=req.body.regid
    var username=req.body.username
    var password=req.body.password
    var contact=req.body.contact
    db.connect(function(err) {
      //if (err) throw err;
      console.log(req.user);
      sql2="INSERT INTO `department`(`deptid`, `name`, `email`, `regid`, `username`, `password`, `contact`) VALUES ('"+deptid+"','"+name+"','"+email+"','"+regid+"','"+username+"','"+password+"','"+contact+"')"
      console.log(sql2)
      db.query(sql2, function (err, result, fields) {
        res.status(200).json({'status':1});
      });
    });
      });

      app.post('/api/selectgodown', function(req, res) {
        var godown=req.body.godown;
        db.connect(function(err) {
          //if (err) throw err;
         
          db.query("SELECT title from godown where city='"+godown+"'", function (err, result, fields) {
            res.status(200).json({'status':1,'info': result});
            console.log(result)
          });
        });
          });
    

          app.post('/api/search', function(req, res) {
            var district=req.body.district;
            var title=req.body.title;
            db.connect(function(err) {
              //if (err) throw err;
             
              db.query("SELECT c.coomodity,c.capacity from cdetails c,department d,godown g WHERE g.regid=d.regid AND c.deptid=d.deptid AND g.city='"+district+"' AND g.title='"+title+"'", function (err, result, fields) {
                res.status(200).json({'status':1,'info': result});
                console.log(result)
              });
            });
              });
        


app.listen('3000', () => {
    console.log('server started on port 3000')
    
})