// middleware/auth.js
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // ✨ FIX: Import Mongoose
const JWT_SECRET = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach the full user payload to req.user, converting ID to a proper ObjectId
    req.user = {
        id: new mongoose.Types.ObjectId(decoded.id),
        role: decoded.role,
        email: decoded.email,
        username: decoded.username,
        // ✨ We get isVerifiedSeller from the token payload as well
        isVerifiedSeller: decoded.isVerifiedSeller 
    };
    
    next();

  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}