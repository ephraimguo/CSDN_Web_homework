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
  res.render('index', { title: 'Express' , list: db});
});

/* post pic to this page*/
router.post("/upload", single, function(req, res, next){
  db.push(req.file.filename);
  fs.writeFileSync(__dirname+"/db.json", JSON.stringify(db));
  res.redirect("/");
});
router.get("/img/:name", function(req, res){
  fs.createReadStream("tempImg/"+req.params.name).pipe(res);
});



module.exports = router;
