const express = require('express');
const { generateDescription } = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/generate-description',authMiddleware , generateDescription);
// router.post('/generate-description' , generateDescription);

module.exports = router;