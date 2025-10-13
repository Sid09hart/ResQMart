// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getMyPurchases } = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createOrder);
router.get('/my-purchases', authMiddleware, getMyPurchases);

module.exports = router;