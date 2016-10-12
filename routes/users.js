var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, result){ 
      if(err){
        res.send(err);
      }else{
        res.send(result);
      } 
   });
});

/* post users listing. */
router.post('/', function(req, res, next) {
  var obj = {
    name : 'Arun Kumar Singh',
    password : '123456',
    phone : 8373908820,
    licence : 'DL10SE3450',
    address : 'New Singh Medical Stores'
  };
  User.create(obj, function(err, result){ 
      if(err){
        res.send(err);
      }else{
        res.send(result);
      } 
   });
});


/* post users listing. */
router.post('/register', function(req, res, next) {
  var obj = req.body.user;
  User.findOne({ phone : obj.phone},function(err,result){
    if(err){
      res.send('Error while creating user');
    }else{
      if(result){
        res.send('User allready exist with phone number '+ obj.phone);
      }else{
          User.create(obj, function(err, result){ 
              if(err){
                res.send(err);
              }else{
                res.send('User created successfull your user id is ' + result.phone);
              } 
          });
      }
     } 
  });
});


router.post('/login', function(req, res, next) {
  var userid = req.body.phone , password = req.body.password;
  
  User.findOne({ phone : userid , password : password},function(err,result){
    if(err){
      res.send('Error while log in');
    }else{
      if(result){
        res.send('Loged in');
      }else{
          res.send('Invalid userid and password');
      }
     } 
  });
});


/* GET users listing. */
router.delete('/', function(req, res, next) {
  var userid = req.body.phone , password = req.body.password;
  User.findOne({ phone : userid , password : password},function(err,result){
    if(err){
      res.send('Error while log in');
    }else{
      if(result){
          User.remove({phone : userid},function(err,result){
            console.log(err + '==' + result);
            if(err){
              res.send('Error while deleting user');
            }else{
              if(result){
                res.send('User deleted successfull');
              }else{
                res.send('No user found');
              }
            }
        });
      }else{
          res.send('Invalid userid and password');
      }
     } 
  });
});

/* GET users listing. */
router.put('/', function(req, res, next) {
  var userid = req.body.phone , password = req.body.password;
  var updatedData = req.body.user;
  User.findOne({ phone : userid , password : password},function(err,result){
    if(err){
      res.send('Error while log in');
    }else{
      if(result){
          User.update(updatedData,function(err,result){
            console.log(err + '==' + result);
            if(err){
              res.send('Error while deleting user');
            }else{
              if(result){
                res.send('User deleted successfull');
              }else{
                res.send('No user found');
              }
            }
        });
      }else{
          res.send('Invalid userid and password');
      }
     } 
  });
});

module.exports = router;
