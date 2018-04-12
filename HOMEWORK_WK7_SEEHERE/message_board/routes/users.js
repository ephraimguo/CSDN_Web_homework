var express = require('express');
var router = express.Router();
var userList = require('./userList');
var logCheck = require('./middleWare/logCheck');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

module.exports = router;
