require('dotenv').config()
const globalServices = require('../../services/index')
const model = require("../../model/index")
const { hostBaseUrl } = require("../../../config/vars")
const validator = require('validator');
const PhoneNumber = require('libphonenumber-js');





const createCompany = async (req, res) => {
    try {
      const { companyName , adminEmail , corporateForm , state, formationState , companyContact ,  address , members} = req.body;
      let  userId = req.user.user_id

  if(companyContact){
    const strippedPhoneNumber = companyContact.replace(/\D/g, '');
   const isValid =  validator.isMobilePhone(strippedPhoneNumber, 'any', { strictMode: false })

   console.log("isValid" + isValid)
   
   if(isValid == false){
    return globalServices.global.returnResponse(
      res,
      400,
      true,
      "Phone number is in Valid",
      {}
    );
   }

  }

      
  if (req.user) {
        let company = await model.company.create({
            companyName: companyName,
            adminEmail: adminEmail ,
            corporateForm : corporateForm,
            state: state,
            formationState: formationState,
            companyContact : companyContact,
            address : address,
            members : members,
            userId : userId
          });
          company = await company.save();
        let updateState = await model.user.findOneAndUpdate(
            { _id: userId },
            { $set: {companyCreated : true } },
            { new: true }
          );
        if (updateState) {
            return globalServices.global.returnResponse(
              res,
              200,
              false,
              "company is created sucessfully",
              company
            );
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

const updateCompanyDetail = async(req,res) => {
    // try {
        let payload = {};
        let { companyId } = req.params
        payload = req.body;
        let userId = req.user.user_id

        const phoneNumber = "+923874777859";

        const strippedPhoneNumber = phoneNumber.replace(/\D/g, '');
        console.log("strippedPhoneNumber" + strippedPhoneNumber)

       console.log(" validator.isMobilePhone(strippedPhoneNumber, 'any', { strictMode: false });" + validator.isMobilePhone(strippedPhoneNumber, 'any', { strictMode: false }))

        let company = await model.company.findOne({ _id : companyId})

        if (userId == company.userId) {
          let profile = await model.company.findOneAndUpdate(
            { _id : companyId},
            { $set: payload },
            { new: true }
          );
          if (profile) {
            return globalServices.global.returnResponse(
              res,
              200,
              false,
              "company detail has been updated",
              profile
            );
          } else {
            return globalServices.global.returnResponse(
              res,
              401,
              true,
              "company not found.",
              {}
            );
          }
        } else {
          return globalServices.global.returnResponse(
            res,
            401,
            true,
            "only company owner can update company details",
            {}
          );
        }
      // } catch (error) {
      //   res.status(500).json(error);
      // }
}

const getCompanyDetail = async (req, res) => {
  try {
    let { companyId } = req.params

    if (companyId) {
      let company = await model.company
        .findOne({ _id : companyId })
        .lean(true);

      if (!company) {
        return globalServices.global.returnResponse(
          res,
          200,
          false,
          "no company found aganist this id",
          {}
        );
      }

      return globalServices.global.returnResponse(
        res,
        200,
        false,
        "comapny detail fetched succesfully",
        company
      );
    }
    else {
      return globalServices.global.returnResponse(
        res,
        404,
        true,
        "comapny not Found",
        {}
      );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};



module.exports = {
    createCompany,
    updateCompanyDetail,
    getCompanyDetail,
}