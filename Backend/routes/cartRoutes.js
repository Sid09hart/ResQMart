// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

// All cart routes should be protected
router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;