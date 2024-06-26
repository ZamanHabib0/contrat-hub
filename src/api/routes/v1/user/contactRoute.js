const express = require('express');
const router = express.Router()
const controller = require('../../../controller/user/contract');
const jsonTokenValidtor = require('../../../middlewears/jwttoken.js');
const imgUploader = require('../../../middlewears/imguploader');
const formUploader = require('../../../middlewears/pdfUploader');




router.post('/create-contract', jsonTokenValidtor ,controller.createContact)

router.post('/send-contract', controller.sendContact)

// router.put('/update-company-detail/:companyId', jsonTokenValidtor,controller.updateCompanyDetail)

// router.get('/get-company-detail/:companyId',  controller.getCompanyDetail)


module.exports = router