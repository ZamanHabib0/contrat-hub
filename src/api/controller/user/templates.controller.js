require('dotenv').config()
const globalServices = require('../../services/index');
const model = require("../../model/index")
const { hostBaseUrl } = require("../../../config/vars")
const validator = require('validator');
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const Models = require('../../model/index');


const createTemplate = async (req, res) => {
    try {

      const { templateForm , templateName , description  } = req.body;
      let  userId = req.user.user_id
     
const user = await model.user.findOne({ _id : userId });

if(user.isadmin == false){
    return globalServices.global.returnResponse(
        res,
        400,
        true,
        "Only admin can upload templates",
        {}
    )
}

const templateData = await model.template.create({
    templateForm : templateForm,
    templateName: templateName,
    description : description
   });

   const dataToSave = await templateData.save();

   return globalServices.global.returnResponse(
    res,
    200,
    false,
    'templete has added successfully',
    dataToSave
  );


    } catch (error) {
      res.status(500).json(error);
    }
}

const updateTemplate = async(req,res) => {
    try {
        let payload = {};
        payload = req.body;
        let userId = req.user.user_id

        const user = await model.user.findOne({ _id : userId });

        if(!payload.templateId){
            return globalServices.global.returnResponse(
                res,
                400,
                true,
                "template id is required",
                {}
            )
        }

        if(user.isadmin == false){
            return globalServices.global.returnResponse(
                res,
                400,
                true,
                "Only admin can upload templates",
                {}
            )
        }

        if (userId) {
          let template = await model.template.findOneAndUpdate(
            { _id : payload.templateId},
            { $set: payload },
            { new: true }
          );
          if (template) {
            return globalServices.global.returnResponse(
              res,
              200,
              false,
              "template updated successfully.",
              template
            );
          } else {
            return globalServices.global.returnResponse(
              res,
              401,
              true,
              "template not found.",
              {}
            );
          }
        } else {
          return globalServices.global.returnResponse(
            res,
            401,
            true,
            "Invalid payload.",
            {}
          );
        }
      } catch (error) {
        res.status(500).json(error);
      }
}

const deleteTemplate = async(req,res) => {
    // try {
        let payload = {};
        payload = req.body;
        let userId = req.user.user_id

        const user = await model.user.findOne({ _id : userId });

        if(!payload.templateId){
            return globalServices.global.returnResponse(
                res,
                400,
                true,
                "template id is required",
                {}
            )
        }

        if(user.isadmin == false){
            return globalServices.global.returnResponse(
                res,
                400,
                true,
                "Only admin can delete templates",
                {}
            )
        }

        if (userId) {
          let template = await model.template.findOneAndDelete(
            { _id : payload.templateId}
          );
          if (template) {
            return globalServices.global.returnResponse(
              res,
              200,
              false,
              "template deleted successfully.",
              template
            );
          } else {
            return globalServices.global.returnResponse(
              res,
              401,
              true,
              "template not found.",
              {}
            );
          }
        } else {
          return globalServices.global.returnResponse(
            res,
            401,
            true,
            "Invalid payload.",
            {}
          );
        }
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
}

const getTemplate = async (req,res)=> {

  try {

    let result = await Models.template.find({});
     


   if(!result) {
     return globalServices.global.returnResponse(
       res,
       400,
       false,
       "no template founds",
       {}
     )
   }
 
   return globalServices.global.returnResponse(
     res,
     200,
     false,
     "templates are given below",
     result
   )
 
  } catch (error) {
   res.status(500).json(error)
  }
 
 
 }

const uploadForm = async (req,res)=> {

     
  try {
   
   const formPath = req.templatePath;


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
     "you form url is",
     {formPath}
   )
 
  } catch (error) {
   res.status(500).json(error)
  }
 
 
 }


 


module.exports = {
    createTemplate,
    uploadForm,
    updateTemplate,
    deleteTemplate,
    getTemplate

}