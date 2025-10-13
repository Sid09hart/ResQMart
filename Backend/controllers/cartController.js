// controllers/cartController.js
const User = require('../models/user');

// Get the user's current cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        if (!user) return res.status(404).json({ message: "User not found." });
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id);

        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Product already in cart, update quantity
            user.cart[itemIndex].quantity += quantity || 1;
        } else {
            // Product not in cart, add new item
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        const populatedUser = await User.findById(req.user.id).populate('cart.product');
        res.status(200).json(populatedUser.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user.id);
        
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        
        await user.save();
        const populatedUser = await User.findById(req.user.id).populate('cart.product');
        res.status(200).json(populatedUser.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};