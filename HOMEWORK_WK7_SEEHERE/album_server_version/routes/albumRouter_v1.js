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

var currentAlbum = "default";


router.get('/', function(req, res){
  res.render('album', {photoName, photoList, currentAlbum});
});

router.post('/addPhotoName', function(req, res) {
  const albName = req.body["new-album"];
  photoName.push(albName);
  photoList[albName] = [];

  console.log(photoList[albName], '--------');
  // console.log(photoName, "------------");
  fs.writeFileSync(__dirname + "/photoName.json", JSON.stringify(photoName));
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  // fs.writeFileSync(__dirname + "/photoName.json", photoName);
  res.redirect("back");
});

router.post('/addPhotos', addPhoto, function(req, res){
  // here need some codes ....
  photoList[currentAlbum].push(req.file.filename);
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  console.log(photoList,"-----------");
  res.redirect("back");
});

router.get('/:photoName', function(req, res){
  // here also need some codes
  currentAlbum = req.params.photoName;
  res.redirect("back");
  // fs.createReadStream(__dirname + "/photosFolder/"+req.params.name).pipe(res);
});


module.exports = router;
