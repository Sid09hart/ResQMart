
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes'); // ✨ IMPORT
const cartRoutes = require('./routes/cartRoutes'); // ✨ IMPORT
const orderRoutes = require('./routes/orderRoutes'); // ✨ IMPORT
const wishlistRoutes = require('./routes/wishlistRoutes'); // ✨ IMPORT
const userRoutes = require('./routes/userRoutes'); // ✨ IMPORT


const app = express();

/** Connect DB **/
connectDB();

/** CORS - allow frontend origin **/
app.use(cors({origin: 'http://localhost:5173', credentials:true}));

/** Body parsers **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/newsletter', newsletterRoutes); // ✨ ADD THIS LINE
app.use('/api/cart', cartRoutes); // ✨ ADD THIS LINE
app.use('/api/orders', orderRoutes); // ✨ ADD THIS LINE
app.use('/api/wishlist', wishlistRoutes); // ✨ ADD THIS LINE
app.use('/api/users', userRoutes); // ✨ ADD THIS LINE



// app.use('/',(req,res)=> res.send('ResQMart is ok'))
/** Start server **/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
