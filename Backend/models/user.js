const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {type:String},
    email: {type:String, required:true, unique:true, trim:true},
    password: {type:String , required: true},
    role: {type:String, enum: ['buyer', 'seller', 'admin'], default: 'seller'},
     isVerifiedSeller: { type: Boolean, default: false },
       // ✨ ADD THESE TWO FIELDS
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
     // ✨ ADD THIS NEW FIELD
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ],

      // ✨ ADD THIS NEW FIELD
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
     // ✨ ADD THIS NEW OBJECT
    sellerApplication: {
        status: { 
            type: String, 
            enum: ['none', 'pending', 'approved', 'rejected'], 
            default: 'none' 
        },
        storeName: { type: String },
        storeAddress: { type: String },
        submittedAt: { type: Date }
    },
}, {timestamps:true}); 


//Hash password before save
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidate){
    return bcrypt.compare(candidate,this.password);
};

module.exports = mongoose.model('User',UserSchema);