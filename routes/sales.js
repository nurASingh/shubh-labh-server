var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Sales = require('../models/sale.js');

router.all('/', function (req, res, next) {
  console.log('Verify user for all calls');
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  var userData = req.headers['user'];
  //var salesData = req.body.sales;
  //verify user then sales data
  Sales.find({
    'phone': userData.phone
  }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/* post users listing. */
router.post('/', function (req, res, next) {
  var salesData = req.body.sales;
  Sales.create(salesData, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/* GET users listing. */
router.delete('/', function (req, res, next) {
  var salesData = req.body.sales;
  Sales.findOne(salesData, function (err, result) {
    if (err) {
      res.send('Error while delete');
    } else {
      if (result) {
        Sales.remove(salesData, function (err, result) {
          console.log(err + '==' + result);
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
          console.log(err + '==' + result);
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