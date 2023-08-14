const express = require('express');
const router = express.Router()
const controller = require('../../../controller/user/profile.controller');
const jsonTokenValidtor = require('../../../middlewears/jwttoken.js');
const imgUploader = require('../../../middlewears/imguploader');
const signatureUploader = require('../../../middlewears/signatureUploader.js');





router.post('/create-profile', jsonTokenValidtor,controller.createProfile)

router.put('/update-profile', jsonTokenValidtor,controller.updateProfile)

router.get('/get-profile', jsonTokenValidtor, controller.getProfile)

router.post('/upload-pic', imgUploader, controller.uploadPic)

router.post('/upload-signature', signatureUploader, controller.uploadSignature)


module.exports = router