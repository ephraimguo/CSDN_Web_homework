const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

const Article = mongoose.model("Article", {
  title: String,
  body: String,
  updateTime: Date,
  createTime: Date
});

module.exports = Article;