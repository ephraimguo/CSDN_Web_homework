const exp= require("express");
const router = exp.Router();
const albumName = require("./photoName");
const photoList = require("./photoList");
const fs = require("fs");

var multer = require("multer");
var addPhotoMW = multer({
  dest: __dirname + "/photosFolder"
});
var addPhoto = addPhotoMW.single("singlePhoto");

var currentAlbum = "default";


router.get('/', function(req, res){
  res.render('album', {albumName, photoList, currentAlbum});
});

router.post('/addAlbumName', function(req, res) {
  const albName = req.body["new-album"];
  albumName.push(albName);
  photoList[albName] = [];

  console.log(photoList[albName], '--------');
  // console.log(albumName, "------------");
  fs.writeFileSync(__dirname + "/photoName.json", JSON.stringify(albumName));
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  // fs.writeFileSync(__dirname + "/photoName.json", albumName);
  res.redirect("back");
});

router.post('/addPhotos', addPhoto, function(req, res){
  // here need some codes ....
  photoList[currentAlbum].push(req.file.filename);
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  console.log(photoList,"-----------");
  res.redirect("back");
});

router.get('/:albumName', function(req, res){
  // here also need some codes
  fs.createReadStream(__dirname+"/photosFolder/"+req.params.albumName).pipe(res);
  // res.redirect("back");
});

router.get('/albums/:albumName', function(req, res){
  currentAlbum = req.params.albumName;
  res.redirect("back");
});


module.exports = router;
