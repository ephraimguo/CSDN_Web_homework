const exp= require("express");
const router = exp.Router();
const photoName = require("photoName");
const photoList = require("photoList");

var fs = require("fs");

var multer = require("multer");
var addPhotoMW = multer({
  dest: __dirname + "photosFolder"
});
var addPhoto = multer.single("singlePhoto");



router.get('/', function(req, res){
  res.render('album', {photoName, photoList});
});

router.post('/addPhotoName', function(req, res){
  photoName.push(req.body);
  fs.writeFileSync(__dirname+"/photoName.json", JSON.stringify(photoName));
  res.redirect("/");
});




module.exports = router;
