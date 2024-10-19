const express = require('express');
const authMiddleware = require('../Middlewares/authMiddleware');
const { postJob } = require('../Controllers/jobControllers');
const router = express.Router();

router.post('/postJob', authMiddleware, postJob);

module.exports = router;
