const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

const Article = mongoose.model("Article", {
  title: {
    type: String,
    maxlength: [10, 'title no more than 15 charactors']
  },
  body: String,
  updateTime: Date,
  createTime: Date
});

module.exports = Article;