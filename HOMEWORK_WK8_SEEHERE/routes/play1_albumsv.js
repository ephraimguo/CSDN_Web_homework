const fs = require('fs');
const express = require('express');
const router = express.Router();
const Album = require('./play1_albumModels');
const multer = require('multer');

var addPhotoMW = multer({
  dest: __dirname + '/photosFolder'
});
var photoUpload = addPhotoMW.single('single_pic'); // arg inside is the name of the form input
