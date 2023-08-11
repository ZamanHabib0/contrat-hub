require('dotenv').config()
const globalServices = require('../../services/index');
const model = require("../../model/index")
const { hostBaseUrl } = require("../../../config/vars")
const validator = require('validator');
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");





const createContract = async (req, res) => {
    // try {
      const { form } = req.body;
      let  userId = req.user.user_id

      const pdfBytes = fs.readFile('D:/Node js/ContractHub/src/api/controller/user/letter.pdf');

      const pdfDoc = await PDFDocument.load(pdfBytes);
    
      const newPage = pdfDoc.insertPage(0);
    
      // Add text to the new page
      newPage.drawText('Hello, PDF!', {
        x: 50,
        y: 500,
        size: 24,
        color: rgb(0, 0, 0), // Black color
      });
    
      // Serialize the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
    
      // Write the modified PDF to a file
      await fs.writeFile('modified.pdf', modifiedPdfBytes);
    
      console.log('PDF modification complete.');


    // } catch (error) {
    //   res.status(500).json(error);
    // }
}

const uploadForm = async (req,res)=> {

  // const { templateName } = req.body;
  // console.log("payload " + templateName)
     
  try {
   
  //  const formPath = req.formPath;

  const { templateName } = req.body;
  console.log("payload " + templateName)

var fileName = templateName
  const storage = await multer.diskStorage({
      destination: (req, file, cb) => {
          const publicDir = path.join( "", 'public');
          const formDir = path.join(publicDir, 'templates');
          // create the directories if they don't exist
          if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir);
          }
          if (!fs.existsSync(formDir)) {
              fs.mkdirSync(formDir);
          }
          cb(null, formDir);
      },
      filename: async (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
           fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

          cb(null, fileName);
      },
  });
  const upload = await multer({ storage }).single('form');
  upload(req, res, (err) => {
      if (err) {
          console.log(err);
      }
      else {
       let formPath = path.join(fileName);
       formPath = "form/" + formPath
           req.formPath = formPath,            
          next();
      }
  });   
 
   if(!formPath) {
     return globalServices.global.returnResponse(
       res,
       400,
       false,
       "due to some error form not uploaded",
       {}
     )
   }
 
   return globalServices.global.returnResponse(
     res,
     200,
     false,
     "you pic url is",
     {formPath}
   )
 
  } catch (error) {
   res.status(500).json(error)
  }
 
 
 }



module.exports = {
    createContract,
    uploadForm

}