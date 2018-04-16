const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

const Album = mongoose.model('Album', {
  name: String,
  photoList: []
});

module.exports = Album;