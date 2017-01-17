var express = require('express');
var router = express.Router();
var Payment = require('../models/payment.js');
var Verify = require('../verify.js');
var passport = require('passport');


/* GET  listing. */
router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  Payment.find({ phone: req.decoded._doc.phone }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/* GET  listing. */
router.post('/getPaymentByDate', Verify.verifyOrdinaryUser, function (req, res, next) {
  var date = req.body.dates;
  var searchParam = {
    phone: req.decoded._doc.phone,
    date: { "$gte": date.start, "$lte": date.end }
  };
  Payment.find(searchParam, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/* post  listing. */
router.post('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
  var obj = req.body.payment;
  obj.phone = req.decoded._doc.phone;
  Payment.create(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


/* GET  listing. */
router.put('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
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