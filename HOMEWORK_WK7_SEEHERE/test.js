const fs = require("fs");

// fs.readdir(__dirname+"/dirTest1", function (err, list) {
//     list.forEach(l=>{
//         console.log(fs.statSync("./dirTest1/"+l).isFile());
//         fs.copyFile('/Users/ephraimguo/Study/Web/homework/HOMEWORK_WK7_SEEHERE/dirTest1/b.txt','/Users/ephraimguo/Study/Web/homework/HOMEWORK_WK7_SEEHERE/dirTest2', (err)=>{console.log(err)});
//     });
// });

fs.copyFile(__dirname+'/dirTest1/b.txt',__dirname+'/dirTest2/b.txt', (err)=>{console.log(err)});
