const multer = require('multer');
const path = require('path');
const { hostBaseUrl } = require("../../config/vars")

const fs = require('fs');
const uploads = async (req, res, next)=>{
    try {

     var fileName 
        const storage = await multer.diskStorage({
            destination: (req, file, cb) => {
                const publicDir = path.join( "", 'public');
                const imagesDir = path.join(publicDir, 'images');
                // create the directories if they don't exist
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir);
                }
                if (!fs.existsSync(imagesDir)) {
                    fs.mkdirSync(imagesDir);
                }
                cb(null, imagesDir);
            },
            filename: async (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                 fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

                cb(null, fileName);
            },
        });
        const upload = await multer({ storage }).single('img');
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            else {
             let imagePath = path.join(fileName);
                imagePath = "image/" + imagePath
                 req.imagePath= imagePath,            
                next();
            }
        });   
    }
    catch (err) { 
        console.log(err);
    }
}

module.exports= uploads;