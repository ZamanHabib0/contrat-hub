const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./profile.route');
const companyRoutes = require('./company.route');
const contractRoutes = require('./contactRoute');



const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', userRoutes);
router.use('/company', companyRoutes);
router.use('/contract', contractRoutes);


module.exports = router;
