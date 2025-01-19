import fs from "fs";
import multer from "multer";
import path from "path";

const tempDir=path.join(__dirname,"../public/temp");

if(!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir,{recursive:true});
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.fieldname+"-"+file.originalname;
      cb(null, uniqueSuffix)
    }
  })
  
export const upload = multer({ storage })