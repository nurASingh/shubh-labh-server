var express = require('express');
var router = express.Router();
var Payment = require('../models/payment.js');
var Verify = require('../verify.js');
var passport = require('passport');


/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  Payment.find({ phone: req.decoded._doc.phone }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/* post users listing. */
router.post('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  var obj = req.body.payment;
  obj.phone = req.decoded._doc.phone;
  Payment.create(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
  //res.send('post');
});

/* GET users listing. */
router.delete('/', function (req, res, next) {
  res.send('delete');
});

/* GET users listing. */
router.put('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  var phone = req.decoded._doc.phone;
  var date = req.body.date;
  var updatedData = req.body.payment;
  updatedData.phone = phone;
  Payment.find({ phone: phone, date: date }, function (err, result) {
    if (err) {
      res.send('Error update payment');
    } else {
      if (result) {

        Payment.update(updatedData, function (err, result) {
          if (err) {
            res.send('Error update payment');
          } else {
            if (result) {
              res.send('updated');
            } else {
              res.send('No record found');
            }
          }
        });
      } else {
        res.send('No results');
      }
    }
  });
});

module.exports = router;