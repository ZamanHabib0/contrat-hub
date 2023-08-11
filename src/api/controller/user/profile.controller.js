require('dotenv').config()
const globalServices = require('../../services/index');
const model = require("../../model/index")
const { hostBaseUrl } = require("../../../config/vars")
const validator = require('validator');




const createProfile = async (req, res) => {
    try {
      const { profileImage , firstName , lastName  , phoneNumber ,  address ,timeZone } = req.body;
      let  userId = req.user.user_id
      console.log("address" + address)

      if(phoneNumber){
        const strippedPhoneNumber = phoneNumber.replace(/\D/g, '');
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

        let profileExist = await model.userProfile.findOne({
          userId: userId,
        })

        if(profileExist) {
            return globalServices.global.returnResponse(
            res,
            401,
            true,
            "Profile with that UserId exist",
            {}
        )
        }


        let profile = await model.userProfile.create({
                profileImage: profileImage,
                firstName: firstName,
                lastName: lastName ,
                phoneNumber: phoneNumber,
                userId: userId,
                address : address,
                timeZone : timeZone
          });

        profile = await profile.save();

        let updateState = await model.user.findOneAndUpdate(
            { _id: userId },
            { $set: { isProfile: true } },
            { new: true }
          );

          

        // let userRole = await Profile.findById({
        //     _id: mongoose.Types.ObjectId(profile._id),
        //   })
        //     .populate("userId", ["role"])
        //     .exec();

        if (updateState) {
            return globalServices.global.returnResponse(
              res,
              200,
              false,
              "Profile is created sucessfully",
              profile
            );
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

const updateProfile = async(req,res) => {
    try {
        let payload = {};
        payload = req.body;
        let userId = req.user.user_id

        if(payload.phoneNumber){
          const strippedPhoneNumber = payload.phoneNumber.replace(/\D/g, '');
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

        if (userId) {
          let profile = await model.userProfile.findOneAndUpdate(
            { userId : userId},
            { $set: payload },
            { new: true }
          );
          if (profile) {
            return globalServices.global.returnResponse(
              res,
              200,
              false,
              "User's profile updated successfully.",
              profile
            );
          } else {
            return globalServices.global.returnResponse(
              res,
              401,
              true,
              "User not found.",
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

const getProfile = async (req, res) => {
  try {
    let userId = req.user.user_id
  

    if (userId) {
      let profile = await model.userProfile
        .findOne({ userId : userId })
        .lean(true);

        const data = {
          _id : profile._id,
          profileImage : hostBaseUrl + profile.profileImage,
          firstName : profile.firstName,
          lastName : profile.lastName,
          phoneCode : profile.phoneCode,
          phoneNumber : profile.phoneNumber,
          userId: profile.userId,
          timeZone : profile.timeZone,
          address : profile.address
        }

      if (!profile) {
        return globalServices.global.returnResponse(
          res,
          200,
          false,
          "no profile found aganist this user",
          {}
        );
      }

      return globalServices.global.returnResponse(
        res,
        200,
        false,
        "User Profile fetched succesfully",
        data
      );
    }
    else {
      return globalServices.global.returnResponse(
        res,
        404,
        true,
        "User not Found",
        {}
      );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadPic = async (req,res)=> {
     
 try {
  
  const imagePath = req.imagePath;

  if(!imagePath) {
    return globalServices.global.returnResponse(
      res,
      400,
      false,
      "due to some error img not uploaded",
      {}
    )
  }

  return globalServices.global.returnResponse(
    res,
    200,
    false,
    "you pic url is",
    {imagePath}
  )

 } catch (error) {
  res.status(500).json(error)
 }


}

module.exports = {
    createProfile,
    updateProfile,
    getProfile,
    uploadPic
}