// routes/authRoutes.js
const express = require('express');
const router = express.Router();
// ✨ FIX: Make sure all functions, including verifyEmail, are imported.
const { register, login, me, verifyEmail } = require("../controllers/authController");
const { authMiddleware } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.get('/verify-email/:token', verifyEmail); // ✨ This line now works correctly.

module.exports = router;