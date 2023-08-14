const express = require('express');
const router = express.Router()
const controller = require('../../../controller/user/templates.controller.js');
const jsonTokenValidtor = require('../../../middlewears/jwttoken.js');
const templateUploader = require('../../../middlewears/pdfUploader');




router.post('/create-template', jsonTokenValidtor , controller.createTemplate)

router.put('/update-template', jsonTokenValidtor,controller.updateTemplate)

router.delete('/delete-template', jsonTokenValidtor ,controller.deleteTemplate)

router.get('/get-template', controller.getTemplate)

router.post('/upload-template', templateUploader , controller.uploadForm)

module.exports = router