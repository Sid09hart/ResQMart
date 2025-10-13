// controllers/orderController.js
const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const { mongoose } = require('mongoose'); // ✨ 1. IMPORT Mongoose

exports.createOrder = async (req, res) => {
    try {
        const { cartItems, deliveryType, shippingAddress, contactDetails, totalAmount } = req.body;
        const buyerId = req.user.id; // This is an ObjectId from our corrected middleware

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        // Stock checking logic
        for (const item of cartItems) {
            const product = await Product.findById(item.product._id);
            if (!product) { return res.status(404).json({ message: `Product not found.` }); }
            if (product.quantity < item.quantity) { return res.status(400).json({ message: `Not enough stock for ${product.name}.` }); }
        }
        
        // Quantity update logic
        for (const item of cartItems) {
            await Product.updateOne({ _id: item.product._id }, { $inc: { quantity: -item.quantity } });
        }

        const products = cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.discountedPrice,
        }));

        const order = new Order({
            buyer: buyerId, // This is now correctly passed as an ObjectId
            products,
            totalAmount,
            deliveryType,
            shippingAddress,
            contactDetails,
        });

        await order.save();

        // Clear the user's cart
        await User.findByIdAndUpdate(buyerId, { $set: { cart: [] } });

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Server error while creating order.' });
    }
};

exports.getMyPurchases = async (req, res) => {
    try {
        const buyerId = req.user.id; // This is an ObjectId from our corrected middleware
        
         // ✨ DEBUG LOG 1: Confirm the user ID
        console.log(`[Backend] Fetching purchases for buyer ID: ${buyerId}`);


        // ✨ 2. Ensure we are querying with the ObjectId
        const purchases = await Order.find({ buyer: buyerId })
            .populate({
                path: 'products.product',
                select: 'name imageUrl sellerName',
            })
            .sort({ createdAt: -1 });
            
             // ✨ DEBUG LOG 2: Confirm the result from the database
        console.log(`[Backend] Found ${purchases.length} purchases for this user.`);


        res.status(200).json(purchases);
    } catch (error) {
        console.error("Failed to fetch purchase history:", error);
        res.status(500).json({ message: "Failed to fetch purchase history." });
    }
};