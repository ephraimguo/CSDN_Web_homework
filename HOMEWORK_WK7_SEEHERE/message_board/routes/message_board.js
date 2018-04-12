const router = require('express').Router(); // import router
const msg = require('./msg');
const userList = require('./userList');
const fs = require('fs');
const PW = require('png-word');
const pw = new PW(PW.RED);

router.get('/',  function(req, res, next){
  req.session.verNum2 = Math.round(Math.random()*1000);
  req.session.verNum1 = Math.round(Math.random()*1000);
  res.locals.title = 'Message Board';
  res.locals.userList = userList;
  res.locals.msg = msg;
  res.locals.user = req.session.user || '';
  res.render('message_board');
});

router.post('/login', function(req, res, next){
  const {userName, pswd, verpng1} = req.body;
  if(userList[userName] && userList[userName]===pswd && req.session.verNum1 === parseInt(verpng1)){
    req.session.user = {uname:userName};
    console.log('log in successfully');
    res.redirect('back');
  }
  else{
    console.log('failed to log in');
    res.redirect('back');
  }
});
router.get('/logout', function(req, res, next){
  req.session.user = undefined;
  res.redirect('back');
});
router.post('/register', function(req, res, next){
  const {newUserName, newPswd, repeatPswd, verpng2} = req.body;

  if(newUserName && newPswd && newPswd === repeatPswd && req.session.verNum2 === parseInt(verpng2)){
    userList[newUserName] = newPswd;
    fs.writeFile(__dirname+"/userList.json", JSON.stringify(userList), (err)=>{
      console.log('Register successfully' || err);
    });
    res.redirect('back');
  }
  else{
    res.redirect('back');
  }
});

router.post('/submitmsg', function(req, res){
  msg.push(req.body.textPlace);

  fs.writeFile(__dirname+"/msg.json", JSON.stringify(msg), (err)=>{
    console.log('Register successfully' || err);
  });
  console.log(req.body);
  res.redirect('back');
});

router.get('/delmsg/:msgCt', function(req, res){
  msg.splice(msg.indexOf(req.params.msgCt), 1);
  res.redirect('back');
});

router.get('/ver_png1', function(req, res){
  pw.createReadStream(req.session.verNum1).pipe(res);
});

router.get('/ver_png2', function(req, res){
  console.log('------ver png accessed ----');
  pw.createReadStream(req.session.verNum2).pipe(res);
});

module.exports = router;
