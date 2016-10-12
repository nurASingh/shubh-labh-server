var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get');
});

/* post users listing. */
router.post('/', function(req, res, next) {
  res.send('post');
});

/* GET users listing. */
router.delete('/', function(req, res, next) {
  res.send('delete');
});

/* GET users listing. */
router.put('/', function(req, res, next) {
  res.send('update');
});

module.exports = router;