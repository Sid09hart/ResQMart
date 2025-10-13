// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { applyToSell } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

router.post('/apply-to-sell', authMiddleware, applyToSell);

module.exports = router;