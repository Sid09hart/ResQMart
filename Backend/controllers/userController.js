// controllers/userController.js
const User = require('../models/user');

exports.applyToSell = async (req, res) => {
    try {
        const { storeName, storeAddress } = req.body;
        if (!storeName || !storeAddress) {
            return res.status(400).json({ message: 'Store name and address are required.' });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);

        if (user.role === 'seller') {
            return res.status(400).json({ message: 'You are already a seller.' });
        }

        user.sellerApplication = {
            status: 'pending',
            storeName,
            storeAddress,
            submittedAt: new Date()
        };

        await user.save();
        res.status(200).json({ message: 'Application submitted successfully. It is now under review.', user });

    } catch (error) {
        console.error("Error submitting seller application:", error);
        res.status(500).json({ message: "Server error." });
    }
};