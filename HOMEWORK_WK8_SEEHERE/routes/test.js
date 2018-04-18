const fs = require('fs');
const express = require('express');
const router = express.Router();
const Album = require('./play1_albumModels');
const multer = require('multer');

var alb = {name: 'xxx'};
// var alb = Album.find({}).then(r=>{
//   return r;
// });

async function getF(){
  alb = await Album.find({});
  console.log(alb[0],'----------------------');
}

getF();



// console.log(alb);