var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Sales = require('../models/sale.js');
var Verify = require('../verify.js');
var Payment = require('../models/payment.js');
var Expense = require('../models/expenses.js');
var Saving = require('../models/saving.js');
var Cash = require('../models/cash.js');


router.all('/', function (req, res, next) {
  next();
});

/* GET users listing. */
// router.get('/', function (req, res, next) {
  // var userData = req.headers['user'];
  //var salesData = req.body.sales;
  //verify user then sales data
  // Sales.find({
    // 'phone': userData.phone
  // }, function (err, result) {
    // if (err) {
      // res.send(err);
    // } else {
      // res.send(result);
    // }
  // });
// });



router.post('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	req.body.dataToSend = {};
	var date = req.body.date;
	  var searchParam = {
    phone: req.decoded._doc.phone,
    date: date
	};
  Payment.find(searchParam, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      req.body.dataToSend.payment = result;
	  next();
    }
  });
	
},
function (req,res,next){
	var date = req.body.date;
	  var searchParam = {
    phone: req.decoded._doc.phone,
    date: date
	};
  Expense.find(searchParam, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      req.body.dataToSend.expenses = result;
	  next();
    }
  });
},
function (req,res,next){
	var date = req.body.date;
	  var searchParam = {
    phone: req.decoded._doc.phone,
    date: date
	};
  Saving.find(searchParam, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      req.body.dataToSend.saving = result;
	  next();
    }
  });
},
function (req,res,next){
	var date = req.body.date;
	  var searchParam = {
    phone: req.decoded._doc.phone,
    date: date
	};
  Cash.find(searchParam, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      req.body.dataToSend.cash = result;
	  res.send(req.body.dataToSend);
    }
  });
});



// router.post('/getPaymentByDate', Verify.verifyOrdinaryUser, function (req, res, next) {
//   var date = req.body.dates;
//   var searchParam = {
//     phone: req.decoded._doc.phone,
//     date: { "$gte": date.start, "$lte": date.end }
//   };
//   Sales.find(searchParam, function (err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

/* post users listing. */


/* GET users listing. */
router.delete('/', function (req, res, next) {
  var salesData = req.body.sales;
  Sales.findOne(salesData, function (err, result) {
    if (err) {
      res.send('Error while delete');
    } else {
      if (result) {
        Sales.remove(salesData, function (err, result) {
          if (err) {
            res.send('Error while deleting sales');
          } else {
            if (result) {
              res.send('sales Data deleted successfull');
            } else {
              res.send('No sales found');
            }
          }
        });
      } else {
        res.send('Invalid sales');
      }
    }
  });
});

/* GET users listing. */
router.put('/', function (req, res, next) {
  var salesDataOld = req.body.salesOld;
  var salesDataNew = req.body.salesNew;
  Sales.findOne(salesDataOld, function (err, result) {
    if (err) {
      res.send('Error while sales');
    } else {
      if (result) {
        Sales.update(salesDataNew, function (err, result) {
          if (err) {
            res.send('Error while deleting sales');
          } else {
            if (result) {
              res.send('sales updated successfull');
            } else {
              res.send('No sales found');
            }
          }
        });
      } else {
        res.send('Invalid sales');
      }
    }
  });
});

module.exports = router;