const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

const Msg = mongoose.Model("Msg", {
  content:[]
});