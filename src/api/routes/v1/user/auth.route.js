const express = require('express');
const router = express.Router()
const userRegister = require('../../../controller/user/auth.controller');
const jsonTokenValidtor = require('../../../middlewears/jwttoken.js');




// register
router.post('/register', userRegister.userRegister)

router.post('/login', userRegister.userLogin)

router.post('/code-verfication', userRegister.confirmEmailVerficationCode)

router.post('/resend-otp', userRegister.resendOtp)

router.post("/forgetPassword" , userRegister.forgetPasswordSending);

router.post("/reset-password" , userRegister.resetPassword);

// router.delete("/deleteUser" , jsonTokenValidtor, userRegister.deleteUser)


module.exports = router