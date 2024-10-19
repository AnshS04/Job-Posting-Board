const express = require('express');
const { registerCompany, verifyEmail, verifyPhone } = require('../Controllers/companyControllers');

const router = express.Router();

router.post('/register', registerCompany);
router.post('/verifyEmail', verifyEmail);
router.post('/verifyPhone', verifyPhone);

module.exports = router;
