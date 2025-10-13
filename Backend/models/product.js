const mongoose = require("mongoose");
 
const ProductSchema = new mongoose.Schema({
   
    name: String,
    category: String,
    imageUrl: String,
    price: Number,
    discountedPrice: Number,
    quantity: Number,
    expiryDate: Date,
    location: {
        type:{type: String, default: "Point"},
        coordinates:[Number]
    },
    
       sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Updated to ObjectId

     sellerName:{type:String},
    deliveryOptions: {type:String, enum: ["pickup", "delivery"]},
    createdAt: {type:Date, default: Date.now},

});

ProductSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Product", ProductSchema);