var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Verify = require('../verify.js');
var passport = require('passport');

router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/', function (req, res, next) {
  User.create(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/register', function (req, res, next) {
  var obj = req.body.user;
  obj.username = req.body.user.phone;
  User.register(new User(obj),req.body.user.password, function (err, user) {
    if (err) {
      res.send({
        
        success : false,
        message :'Registration failed : ' + err
      
      });
    } else {
      res.send({
        success : true,
        message :'Registration Done - Login with : ' + user.username
      });
    }
  });

});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token,
        user : {name : user.name , phone : user.phone ,address : user.address ,licence : user.licence}
      });
    });
  })(req, res, next);
});

router.delete('/', function (req, res, next) {
  var userid = req.body.phone, password = req.body.password;
  User.findOne({ phone: userid, password: password }, function (err, result) {
    if (err) {
      res.send('Error while log in');
    } else {
      if (result) {
        User.remove({ phone: userid }, function (err, result) {
          if (err) {
            res.send('Error while deleting user');
          } else {
            if (result) {
              res.send('User deleted successfull');
            } else {
              res.send('No user found');
            }
          }
        });
      } else {
        res.send('Invalid userid and password');
      }
    }
  });
});

router.put('/', function (req, res, next) {
  var userid = req.body.phone, password = req.body.password;
  var updatedData = req.body.user;
  User.findOne({ phone: userid, password: password }, function (err, result) {
    if (err) {
      res.send('Error while log in');
    } else {
      if (result) {
        User.update(updatedData, function (err, result) {
          if (err) {
            res.send('Error while deleting user');
          } else {
            if (result) {
              res.send('User deleted successfull');
            } else {
              res.send('No user found');
            }
          }
        });
      } else {
        res.send('Invalid userid and password');
      }
    }
  });
});

module.exports = router;