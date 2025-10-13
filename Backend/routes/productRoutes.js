// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
    uploadProduct, 
    getAllProducts, 
    deleteProduct, 
    updateProduct, 
    getProductById, 
    getMyProducts 
} = require('../controllers/productController');
const { authMiddleware } = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- PUBLIC ROUTES ---
router.get('/', getAllProducts);


// --- PROTECTED ROUTES (MUST COME BEFORE DYNAMIC /:id) ---
// ✨ FIX: This specific route is now defined BEFORE the generic /:id route
router.get('/my-listings', authMiddleware, getMyProducts);


// --- DYNAMIC PUBLIC ROUTE (MUST COME AFTER MORE SPECIFIC ROUTES) ---
router.get('/:id', getProductById);


// --- OTHER PROTECTED ROUTES ---
router.post('/upload', authMiddleware, upload.single('image'), uploadProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.patch('/:id/stock', authMiddleware, updateProduct);

module.exports = router;