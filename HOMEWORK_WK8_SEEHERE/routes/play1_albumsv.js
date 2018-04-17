const fs = require('fs');
const express = require('express');
const router = express.Router();
const Album = require('./play1_albumModels');
const multer = require('multer');

var addPhotoMW = multer({
  dest: __dirname + '/photosFolder/'
});
var photoUpload = addPhotoMW.single('single_pic'); // arg inside is the name of the form input
var currentAlbum = Album.find({}, function(err, cAlb){
  return cAlb;
});


photoList = currentAlbum.photoList || [];
var photoPerPage = 3;
var currentPage = 1;
var pageContent = [];


// render the main page of the album
router.get('/', async function(req, res){
  let albumList = await Album.find({});
  await showCurrentPage(currentPage, currentAlbum);
  console.log('xxxxxxxxxx', typeof currentAlbum);
  res.render('play1_album', {albumList, photoPerPage, currentPage, pageContent, currentAlbum, photoList});
});


// create new album
router.post('/addNewAlbum', async function(req, res){
  const albName = req.body['new-album'];
  await Album.create({
    name: albName
  });
  res.redirect('/album');
});


// album list, Left list, change currentAlbum value.
router.get('/albums/:currentAlbumId', async function(req, res){
  currentAlbum = await Album.findById(req.params.currentAlbumId);
  photoList = currentAlbum.photoList;
  currentPage = 1;
  console.log('current album', currentAlbum.name);
  console.log('current photolist', currentAlbum.photoList);
  res.redirect('/album');
});


// upload photo to current album
router.post('/uploadNewPh', photoUpload, async function(req, res){
  // try{
    let arrays = currentAlbum.photoList;
    arrays.push(req.file.filename);
    console.log(arrays);
    await Album.findByIdAndUpdate(currentAlbum.id, {photoList: arrays});
    res.redirect('/album');
  // }
  // catch(err){
  //   console.log(err,'---------');
  //   res.redirect('/album');
  // }

});


// display current photoList
router.get('/photolist/:imgFileName', function(req, res){
  fs.createReadStream(__dirname+'/photosFolder/'+req.params.imgFileName).pipe(res);
});


// del photo, X buttom
router.get('/delphoto/:photo', function(req, res){

});

// del album, X button
router.get('/delalbum/:currentAlbumId', function(req, res){

});


// function to display all the corresponding page
async function showCurrentPage(currentPage, currentAlbum){
  pageContent = [];
  if(currentAlbum){
    for(let i=(currentPage-1)*photoPerPage; i<currentPage*photoPerPage; i++) {
      if (photoList && photoList[i] !== undefined && photoList[i] !== null) {
        pageContent.push(photoList[i]);
      }
      else {
        console.log('no enough pic');
      }
    }
  }
  else{
    console.log('current album no pic yet');
  }
}

module.exports=router;