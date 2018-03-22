// file system framework imported
const fs = require("fs");
const path = require("path");

// function cpdir created and returning a Promise obj
function cpdir(oldDirPath, newDirPath) {

    let s = "success",
        f = 'failed';

    return new Promise(function (resolve, reject) {

        fs.readdir(oldDirPath, function (err1, fileList) {
            if (err1) {
                console.log("err1", err1);
                reject(f);
            }
            else {
                fileList.forEach(file => {

                    let oldfilePath = path.join(oldDirPath, file);
                    let newfilePath = path.join(newDirPath, file);

                    fs.copyFile(oldDirPath + "/" + file, newDirPath + "/" + file, (err2) => console.log("err2", err2));

                    if (fs.statSync(oldDirPath + "/" + file).isDirectory()) {
                        console.log("is Dir");
                        // cpdir(oldDirPath + "/" + file, newDirPath + "/" + file);
                        cpdir(oldfilePath, newfilePath);

                    }
                    else {
                        console.log("is File");
                    }

                    resolve(s);

                });
            }
        });
    });


}


let p = cpdir(__dirname+"/dirTest1", __dirname+"/dirTest2");
p.then((r)=>{console.log('------Success');console.log("resolved a",r)}).catch(error=>{console.log("FAILED", error);});




