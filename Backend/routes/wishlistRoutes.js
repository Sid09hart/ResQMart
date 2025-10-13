// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { authMiddleware } = require('../middleware/auth');

// All wishlist routes are protected
router.use(authMiddleware);

router.get('/', getWishlist);
router.post('/add/:productId', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);

module.exports = router;