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
// const currentAlbumLength = photoList[currentAlbum].length;
var photoPerPage = 3;
var currentPage = 1;
var pageContent = [];

function displayPhotoPage(currentPage, currentAlbum){
  pageContent = [];
  for(let i=(currentPage-1)*photoPerPage; i<currentPage*photoPerPage; i++) {
    if (photoList[currentAlbum] && photoList[currentAlbum][i] !== undefined && photoList[currentAlbum][i] !== null) {
      pageContent.push(photoList[currentAlbum][i]);
    }
    else {
      console.log('no enough pic');
    }
  }
}
// init
router.get('/', function(req, res){

  displayPhotoPage(currentPage, currentAlbum);
  res.render('album', {albumName, photoList, currentAlbum, photoPerPage, currentPage, pageContent});
});

// add new album name
router.post('/addAlbumName', function(req, res) {
  const albName = req.body["new-album"];
  albumName.push(albName);
  photoList[albName] = [];

  fs.writeFileSync(__dirname + "/photoName.json", JSON.stringify(albumName));
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  res.redirect("back");
});

// add photo to designated album
router.post('/addPhotos', addPhoto, function(req, res){
  // here need some codes ....
  photoList[currentAlbum].push(req.file.filename);
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  displayPhotoPage(currentPage, currentAlbum);
  res.redirect("back");
});

//photoList, right center
router.get('/show/:phName', function(req, res){
  // console.log(req.params.phName, '*_*_*_*_*_*_*_*_*', __dirname);
  console.log(req.params.phName,'*_*_*_*_*_*_*_*_*');
  let rs = fs.createReadStream(__dirname+"/photosFolder/"+req.params.phName);
  rs.pipe(res);
});
//photo del button, X button
router.get('/del/photos/:pct', function(req, res){
  let ind = photoList[currentAlbum].indexOf(req.params.pct);
  photoList[currentAlbum].splice(ind, 1);
  fs.writeFileSync(__dirname + "/photoName.json", JSON.stringify(albumName));
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  res.redirect('back');
});


//album list, on left side
router.get('/albums/:albumName', function(req, res){
  currentAlbum = req.params.albumName;
  currentPage = 1;
  console.log('this is album-list router');
  res.redirect("/album1");
});
//album-list del btn, on left side
router.get('/del/album-list/:albn', function(req, res){
  delete photoList[req.params.albn];
  let ind = albumName.indexOf(req.params.albn);
  console.log(req.params.albn,'x=x=x=x=x',ind,'x=x=x=x=x',albumName);
  albumName.splice(ind, 1);
  currentAlbum = albumName[0]?albumName[0]:console.log('no album yet');
  currentPage = 1;
  fs.writeFileSync(__dirname + "/photoName.json", JSON.stringify(albumName));
  fs.writeFileSync(__dirname + "/photoList.json", JSON.stringify(photoList));
  res.redirect("back");
});


//album pagination links, on right bottom
router.get('/albums/page/:pageNum', function(req, res){
  currentPage = Number(req.params.pageNum)+1;
  console.log(currentPage,'-----page-------','page router');
  displayPhotoPage(currentPage, currentAlbum);
  res.redirect("/album1");
});


module.exports = router;
