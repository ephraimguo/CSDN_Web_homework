const express = require('express');
const router = express.Router();
const Article = require('./articleModels');

router.get('/', async function(req, res, next){
  const page = +req.query.page || 1;
  const artList = await Article.find().select('-body').sort('-updateTime').limit(2).skip((page-1)*2);
  const prevPage = page-1>0?page-1:1;
  const nextPage = page+1;

  res.render("ap",{title:'Article Publication',artList, prevPage, nextPage});
});


// create article
router.post('/create', async function(req, res){
  const {title, body} = req.body;
  const doc = new Article({
    title, body, createTime:new Date(), updateTime:new Date()
  });
  try{
    await doc.save();
    res.redirect('/article');
  }catch(err){
    res.render('createArticle', {error: err.errors.title.message});
  }

});
// render creating page
router.get('/create', function(req, res){
  res.render('createArticle');
});

// delete article
router.get('/:id/del',async function(req, res){
  await Article.remove({_id:req.params.id});
  res.redirect("/article");
});

// edit article
router.post('/:id/edit', async function(req, res){
  const id = req.params.id;
  const {title, body} = req.body;
  const doc = await Article.findById(id);
  if(doc){
    doc.title = title;
    doc.body = body;
    doc.updateTime = new Date();
    await doc.save();
  }
  res.redirect('/article');
});
// render edit pages
router.get('/:id/edit', async function(req, res){
  const id = req.params.id;
  const art = await Article.findById(id);
  res.render("editArticle", {id,art});
});


module.exports = router;