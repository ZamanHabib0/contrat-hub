require('dotenv').config()
const globalServices = require('../../services/index');
const model = require("../../model/index")
const { hostBaseUrl } = require("../../../config/vars")
const validator = require('validator');
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");





const createContact = async (req, res) => {
    // try {

    const { contractForm , contractName , recipients , canvasDetail, contractStatus , companySignerDetail} = req.body;

    // const oldDraft = await model.contract.findOne({ email });

    //   if (oldDraft) {
    //     return globalServices.global.returnResponse(
    //       res,
    //       200,
    //       true,
    //       'Draft already exists',
    //       {}
    //     );
    //   }

    const contract = await model.contract.create({
      contractForm : contractForm,
      contractName : contractName,
      companySignerDetail : companySignerDetail,
      recipients : recipients,
      canvasDetail : canvasDetail,
      contractStatus : contractStatus
    });

    const savedContract = await contract.save();
   console.log("savedContract" + savedContract)

   if(contract){
    return globalServices.global.returnResponse(
      res,
      200,
      false,
      'Contract created successfully',
      contract
    );
   }

   return globalServices.global.returnResponse(
    res,
    400,
    true,
    'due to some error contract has not created yet',
    contract
  );
   

    // } catch (error) {
    //   res.status(500).json(error);
    // }
}

const sendContact = async (req, res) => {
  // try {

  const { contractId } = req.body;

  const contractDetail = await model.contract.findOne({ _id : contractId });

    if (!contractDetail) {
      return globalServices.global.returnResponse(
        res,
        400,
        true,
        'no contract found against this id',
        {}
      );
    }

    

  const savedContract = await contract.save();
 console.log("savedContract" + savedContract)

 if(contract){
  return globalServices.global.returnResponse(
    res,
    200,
    false,
    'Contract created successfully',
    contract
  );
 }

 return globalServices.global.returnResponse(
  res,
  400,
  true,
  'due to some error contract has not created yet',
  contract
);
 

  // } catch (error) {
  //   res.status(500).json(error);
  // }
}




module.exports = {
  createContact,
    sendContact

}