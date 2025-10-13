// controllers/wishlistController.js
const User = require('../models/user');

exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { wishlist: productId } }, // $addToSet prevents duplicates
            { new: true }
        ).populate('wishlist');
        res.status(200).json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { wishlist: productId } },
            { new: true }
        ).populate('wishlist');
        res.status(200).json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};