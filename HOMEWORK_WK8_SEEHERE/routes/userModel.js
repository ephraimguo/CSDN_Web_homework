const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

const User = mongoose.Model("User", {
  username:{
    type: String,
    require: true,
    maxlength: 15,
    minlength: 5
  },
  content:[],
  pass: String
});