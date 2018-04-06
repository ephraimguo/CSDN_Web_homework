var express = require('express');
var router = express.Router();
var fs = require("fs");
var db = require("./db");
var multer = require("multer");
// var imgs = [];
var upload = multer({
    dest: "tempImg"
});
let single = upload.single("singleFile");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , });
});

module.exports = router;
