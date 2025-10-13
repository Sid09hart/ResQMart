// models/order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number, // Price at the time of purchase
    }],
    totalAmount: { type: Number, required: true },
    deliveryType: { type: String, enum: ['pickup', 'delivery'], required: true },
    shippingAddress: { // Optional, only if deliveryType is 'delivery'
        street: String,
        city: String,
        state: String,
        zip: String,
    },
    contactDetails: {
        fullName: String,
        email: String,
        phone: String,
    },
    status: { type: String, enum: ['Completed', 'Pending', 'Canceled'], default: 'Completed' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);