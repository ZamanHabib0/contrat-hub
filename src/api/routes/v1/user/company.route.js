const express = require('express');
const router = express.Router()
const controller = require('../../../controller/user/company.controller.js');
const jsonTokenValidtor = require('../../../middlewears/jwttoken.js');
const imgUploader = require('../../../middlewears/imguploader');




router.post('/create-company', jsonTokenValidtor ,controller.createCompany)

router.put('/update-company-detail/:companyId', jsonTokenValidtor,controller.updateCompanyDetail)

router.get('/get-company-detail/:companyId',  controller.getCompanyDetail)


module.exports = router