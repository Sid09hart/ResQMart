// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // Assuming this utility exists

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPRESS_IN = process.env.JWT_EXPRESS_IN || '1d';

function signToken(user) {
    return jwt.sign(
        {
            id: user._id.toString(),
            role: user.role,
            email: user.email,
            username: user.username,
            isVerifiedSeller: user.isVerifiedSeller
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPRESS_IN }
    );
}

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and Password required' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "User already exist" });

        const user = new User({ username, email, password, role: 'buyer', isVerifiedSeller: false });
        
        // This is the email verification logic we discussed.
        // If you want to log the user in directly, this block can be modified.
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
        user.verificationTokenExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        try {
            const verificationUrl = `http://localhost:5173/verify-email/${verificationToken}`;
            const message = `Thank you for registering! Please verify your email by clicking this link: ${verificationUrl}`;
            
            await sendEmail({
                email: user.email,
                subject: 'Verify Your ResQMart Account',
                message
            });

            res.status(200).json({ message: 'Registration successful. Please check your email to verify your account.' });
        } catch (err) {
            await User.findByIdAndDelete(user._id);
            return res.status(500).json({ error: 'Error sending verification email. Please try again.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
        
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = signToken(user);
        res.json({
            token,
            user: { id: user._id, email: user.email, username: user.username, role: user.role, isVerifiedSeller: user.isVerifiedSeller }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// ✨ FIX: Ensure this function is defined and exported.
exports.verifyEmail = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        
        const user = await User.findOne({ 
            verificationToken: hashedToken,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token.' });
        }

        user.isVerifiedSeller = true; // Or just mark email as verified
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        const token = signToken(user);
        res.status(200).json({ 
            message: 'Email verified successfully!',
            token,
            user: { id: user._id, email: user.email, username: user.username, role: user.role, isVerifiedSeller: user.isVerifiedSeller }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during email verification.' });
    }
};