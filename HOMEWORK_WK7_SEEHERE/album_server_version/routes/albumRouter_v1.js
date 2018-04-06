const exp= require("express");
const router = exp.Router();
const photoName = require("./photoName");
const photoList = require("./photoList");
const fs = require("fs");

var multer = require("multer");
var addPhotoMW = multer({
  dest: __dirname + "/photosFolder"
});
var addPhoto = addPhotoMW.single("singlePhoto");



router.get('/', function(req, res){
  res.render('album', {photoName, photoList});
});

router.post('/addPhotoName', function(req, res) {
  photoName.push(req.body);
  console.log(photoName, "------------");
  fs.writeFileSync(__dirname + "/photoName.json", JSON.stringify(photoName));
  res.redirect("back");
});


module.exports = router;
