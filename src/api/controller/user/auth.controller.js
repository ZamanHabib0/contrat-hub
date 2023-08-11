const model = require("../../model/index")
const nodemailer = require("../../../config/nodemailer_config.js");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config()
const globalServices = require('../../services/index');
const { JwtTokenKey } = require("../../../config/vars");
const { tokenKey } = require('../../../config/vars');


const userRegister = async (req,res) => {
    try{

      const TokenVersion = Math.floor(100000 + Math.random() * 900000);
      // const otp = Math.floor(100000 + Math.random() * 900000);
       const otp = "1234";

        const { userName , email, password  } = req.body;

        if(!userName || !email || !password ){
          return globalServices.global.returnResponse(
            res,
            400,
            true,
            'required fields are missing',
            {}
          );
        }
 
        const oldUser = await model.user.findOne({ email });


 
      if (oldUser) {
        return globalServices.global.returnResponse(
          res,
          200,
          true,
          'User already exists',
          {}
        );
      }

    encryptedPassword = await bcrypt.hash(password, 10);
   

        const userData = await model.user.create({
          userName : userName,
           email: email,
           password : encryptedPassword,
           otp : otp
         });

        const dataToSave = await userData.save();
    
          let data = {
           
            userId: userData._id,
            username: userData.username,
            email: userData.email,
            isActive: userData.isActive,
            isProfile: userData.isProfile,
          };


//      nodemailer.sendConfirmationEmail(
//       userName,
//         email,
//         EmailVerfcationCode
//  );

   return globalServices.global.returnResponse(
    res,
    200,
    false,
    'User registered successfully',
    data
  );

}
catch(error){
  res.status(500).json(error);
}
} 

const userLogin = async (req,res)=>{
    
    try {
      const TokenVersion = Math.floor(100000 + Math.random() * 900000);

        const { email, password } = req.body;
  
        const user = await model.user.findOne({ email });
  
        if (user.isActive != true) {
          return globalServices.global.returnResponse(
            res,
            200,
            false,
            "Pending Account. Please Verify Your Email!",
            {}
          );
        }
    
        if (email && (await bcrypt.compare(password, user.password))) {
  
          const token = jwt.sign(
            { user_id: user._id ,
            isAdmin : user.isAdmin,
            tokenVersion : TokenVersion},
            process.env.TOKEN_KEY,
         
          );

          user.tokenVersion = TokenVersion;

          await user.save();

             let data = {
              authToken: token,
            userId: user._id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            isProfile: user.isProfile,
          };
          return globalServices.global.returnResponse(
            res,
            201,
            false,
            "Autorized",
            data,
            
          );
  
          
        }else{
          globalServices.global.returnResponse(
            res,
            401,
            false,
            'Wrong Credentials',
            {}
          );
        }
  
      } catch (err) {
        res.status(500).json(err)
      }
  
 }

const confirmEmailVerficationCode = async (req,res)=> {
    const { otp , userId } = req.body;

    try {
      const TokenVersion = Math.floor(100000 + Math.random() * 900000);
      const user = await model.user.findOne({ _id: userId });
  
      if (otp) {
        if (otp == user?.otp) {
          const updateOtp = await model.user.findOneAndUpdate(
            { _id: userId },
            { $set: { otp: '', isActive: true } },
            { new: true }
          );
  
          console.log('updateOtp: ', updateOtp);
     
              const token = jwt.sign(
          { user_id: user._id ,
          isAdmin : user.isAdmin,
          tokenVersion : TokenVersion},
          tokenKey ,
        );

        user.tokenVersion = TokenVersion;

        await user.save();

        let data = {
          authToken: token,
          userId: user._id,
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          isProfile: user.isProfile,
        };
  
          return globalServices.global.returnResponse(
            res,
            200,
            false,
            'OTP successfully matched',
            data
          );
        } else {
          return globalServices.global.returnResponse(
            res,
            401,
            true,
            'OTP not matched',
            {}
          );

        }
      } else {
        return globalServices.global.returnResponse(
          res,
          400,
          false,
          'OTP not validate',
          {}
        );
        // return res.json({ success: false, message: 'OTP not validate' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

const forgetPasswordSending = async (req,res)=> {
  const { email } = req.body;
  try {
    // const otp = Math.floor(100000 + Math.random() * 900000);
    const otp  = "1234"

  
    if(!email) {
      return globalServices.global.returnResponse(
        res,
        400,
        true,
        "required field are missing",
        {}
      )
    }


    const user = await model.user.findOne({ email });

    if (user) {
      user.otp = otp;

     await user.save();

     let data = {
      userId: user._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isProfile: user.isProfile,
    };

      return globalServices.global.returnResponse(
        res,
        201,
        false,
        "Email has been Send",
        {data}
      )
    }else{
     return globalServices.global.returnResponse(
        res,
        404,
        true,
        "User Not found",
        {}
      )
    }

  } catch (err) {
    console.log(err);
  }

}

const resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    // const otp = randomstring.generate({ length: 4, charset: 'numeric' });
    const otp = '1234';
    const user = await model.user.findOneAndUpdate(
      { _id: userId },
      { $set: { otp: otp, isActive: false } }
    );

    if (!user) {
      return globalServices.global.returnResponse(
        res,
        401,
        false,
        'User not Found',
        {}
      );
    }
    let content = { otp: `${otp}` };

    return globalServices.global.returnResponse(
      res,
      200,
      false,
      'OTP send sucessfully',
      {}
    );

  } catch (error) {
    res.status(500).json(error);
  }
};

const resetPassword = async (req, res) => {
  let { newPassword, userId } = req.body;
  try {

    if (!userId && !newPassword ) {
      return globalServices.global.returnResponse(
        res,
        400,
        true,
        'Required fields are missing',
        {}
      );
    }

    const user = await model.user.findOne({ _id: userId });

    if (!user) {
      return globalServices.global.returnResponse(
        res,
        400,
        true,
        'Oops! Something went wrong while finding User',
        {}
      );
    }

    if (user) {
      encryptedPassword = await bcrypt.hash(newPassword, 10);

      user.password = encryptedPassword;
      user.isActive = true;

      user.save();


      return globalServices.global.returnResponse(
        res,
        200,
        false,
        'Your password is changed successfully!',
        {}
      );
    } else {
      return globalServices.global.returnResponse(
        res,
        400,
        true,
        'Unsuccessful! Current Password not matched',
        {}
      );
    }
  } catch (error) {
    res.status(500).json(error);
  }

};

// const deleteUser = async ( req,res)=>{

//   const _id = req.user.user_id;
//   const { password } = req.body;
//   console.log(_id)


//   const user = await authModel.findOne({ _id : _id });
//   console.log(user)

//       if(user){
//         if(await bcrypt.compare(password, user.password)){
//           await authModel.findOneAndDelete({ _id : _id});
      
//        return globalService.global.returnResponse(
//         res,
//         201,
//         false,
//         "User has been deleted",
//         {}
//       );
//         }else{
//           globalService.global.returnResponse(
//             res,
//             401,
//             true,
//             "Password is incorrect",
//             {}
//           )
//       }
//       }else{
//         globalService.global.returnResponse(
//           res,
//           404,
//           true,
//           "User does not exist",
//           {}
//         ) 
//       }
//   }








module.exports = {
    userRegister,
    userLogin,
    confirmEmailVerficationCode,
    resendOtp,
    forgetPasswordSending,
    resetPassword
    // deleteUser,
}