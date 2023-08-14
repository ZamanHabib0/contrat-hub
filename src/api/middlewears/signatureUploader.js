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
                const signaturesDir = path.join(publicDir, 'signatures');
                // create the directories if they don't exist
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir);
                }
                if (!fs.existsSync(signaturesDir)) {
                    fs.mkdirSync(signaturesDir);
                }
                cb(null, signaturesDir);
            },
            filename: async (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                 fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

                cb(null, fileName);
            },
        });
        const upload = await multer({ storage }).single('signature');
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            else {
             let signaturePath = path.join(fileName);
             signaturePath = "signature/" + signaturePath
                 req.signaturePath= signaturePath,            
                next();
            }
        });   
    }
    catch (err) { 
        console.log(err);
    }
}

module.exports= uploads;