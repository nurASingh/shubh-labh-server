var express = require('express');
var router = express.Router();
var Expense = require('../models/expenses.js');
var Verify = require('../verify.js');
var passport = require('passport');


/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  Expense.find({ phone: req.decoded._doc.phone }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


router.post('/getExpensesByDate', Verify.verifyOrdinaryUser, function (req, res, next) {
  var date = req.body.dates;
  var searchParam = {
    phone: req.decoded._doc.phone,
    date: { "$gte": date.start, "$lte": date.end }
  };
  Expense.find(searchParam, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/* post users listing. */
router.post('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  var obj = req.body.expense;
  obj.phone = req.decoded._doc.phone;
  console.log(obj);
  Expense.create(obj, function (err, result) {
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
  var updatedData = req.body.expense;
  updatedData.phone = phone;
  Expense.find({ phone: phone, date: date }, function (err, result) {
    if (err) {
      res.send('Error update Expense');
    } else {
      if (result) {

        Expense.update(updatedData, function (err, result) {
          if (err) {
            res.send('Error update Expense');
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