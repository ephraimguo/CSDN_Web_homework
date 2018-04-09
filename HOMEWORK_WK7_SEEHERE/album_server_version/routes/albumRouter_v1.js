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
  // pageContent.push(photoList[currentAlbum][i]);
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
router.get('/show/'+currentAlbum+'/:phName', function(req, res){
  displayPhotoPage(currentPage, currentAlbum);
  console.log(req.params.phName, '----', __dirname);
  fs.createReadStream(__dirname+"/photosFolder/"+req.params.phName).pipe(res);
  // res.redirect("back");
  // let reader = fs.createReadStream(__dirname+"/photosFolder/"+req.params.phName);
  // if(photoList[currentAlbum] === "" || photoList[currentAlbum] === undefined || photoList[currentAlbum] === null){
  //   console.log('nothing to show');
  //   res.redirect('back');
  // }
  // else{
  //   reader.pipe(res);
  // }

  // console.log(photoList[currentAlbum], 'xxxxxxxxxxx');
  // fs.createReadStream(__dirname+"/photosFolder/"+req.params.phName).pipe(res);
});


//album list, on left side
router.get('/albums/:albumName', function(req, res){
  currentAlbum = req.params.albumName;
  console.log('this is album list router');
  res.redirect("/album1");
});

//album pagination links, on right bottom
router.get('/albums/'+currentAlbum+'/page/:pageNum', function(req, res){
  // here also need some codes
  currentPage = Number(req.params.pageNum)+1;
  console.log(currentPage,'-----page-------','page router');
  displayPhotoPage(currentPage, currentAlbum);
  res.redirect("/album1");
});

// function pagination(){
//   for(let i = 0; i<currentAlbumLength/photoPerPage; i++) {
//     let pageNavLink = document.createElement('a');
//     let pageNavLi = document.createElement('li');
//     pageNavLink.innerText = `${i + 1}`;
//     pageNavLink.onclick = function () {
//       currentPage = i + 1;
//     };
//     pageNavLi.appendChild(pageNavLink);
//     pageNav.appendChild(pageNavLi);
//   }
//
// }


module.exports = router;
