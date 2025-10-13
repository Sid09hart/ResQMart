// controllers/productController.js
const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');
const autoDiscount = require('../utils/autoDiscount');
const streamifier = require('streamifier');
const { mongoose } = require('mongoose');

const uploadBufferToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

exports.uploadProduct = async (req, res) => {
  try {
          if (!req.user.isVerifiedSeller) {
      return res.status(403).json({ message: 'Your seller account is pending approval and cannot post products.' });
    }

    const sellerId = String(req.user.id); // From JWT token
    const sellerName = req.user.username;
    if (!sellerId) return res.status(401).json({ message: 'Unauthorized' });

    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No image file uploaded' });

    // Upload image to Cloudinary
    const cloudResult = await uploadBufferToCloudinary(file.buffer);

    // Extract and validate request body fields
    const { name, category, price, quantity, expiryDate, latitude, longitude, deliveryOption } = req.body;

    if (!name || !price || !quantity || !expiryDate || !latitude || !longitude) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);
    const discountedPrice = autoDiscount(expiryDate, numericPrice);

    // Create product document
    const product = await Product.create({
      name,
      category,
      price: numericPrice,
      discountedPrice,
      quantity: numericQuantity,
      expiryDate: new Date(expiryDate),
      sellerId, // use the sellerId from the JWT
      sellerName, //From JWT 
      deliveryOption: deliveryOption || 'pickup',
      imageUrl: cloudResult.secure_url,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });

    return res.status(201).json({ product });
  } catch (err) {
    console.error('Error uploading product:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// ✨ ================================================================
// ✨ START OF CHANGES: Here is the updated getAllProducts function
// ✨ ================================================================

// controllers/productController.js

// ... keep all your other functions (uploadProduct, etc.) the same ...

exports.getAllProducts = async (req, res) => {
  try {
    const { category, maxDistance, sortBy, latitude, longitude, limit } = req.query;

    let query = {};

    // Category Filtering (case-insensitive)
    if (category) {
      const categories = category.split(',');
      const categoryRegex = categories.map(cat => new RegExp(`^${cat}$`, 'i'));
      query.category = { $in: categoryRegex };
    }

    // ✨ START OF NEW, MORE ROBUST DISTANCE LOGIC
    if (latitude && longitude && maxDistance && parseFloat(maxDistance) > 0) {
      const lon = parseFloat(longitude);
      const lat = parseFloat(latitude);
      
      // We use $geoWithin with $centerSphere for distance filtering.
      // It requires the radius to be in radians.
      const radiusInKm = parseFloat(maxDistance);
      const radiusInRadians = radiusInKm / 6378.1; // Earth's radius in kilometers

      query.location = {
        $geoWithin: {
          $centerSphere: [[lon, lat], radiusInRadians]
        }
      };
    }
    // ✨ END OF NEW LOGIC

    let sortOptions = {};
    switch (sortBy) {
      case 'price_low_high':
        sortOptions.discountedPrice = 1;
        break;
      case 'price_high_low':
        sortOptions.discountedPrice = -1;
        break;
      // We will handle 'distance_closest' separately as it requires a different query type
      case 'expiry_soonest':
      default:
        sortOptions.expiryDate = 1;
        break;
    }
      // ✨ Create the query chain
    let productQuery = Product.find(query).sort(sortOptions);

    // ✨ Apply the limit if it was provided
    if (limit) {
      productQuery = productQuery.limit(parseInt(limit, 10));
    }

    // ✨ Execute the final query
    const products = await productQuery.exec();
    
    return res.status(200).json(products);

    
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ... keep all your other functions the same ...

exports.getMyProducts = async(req,res)=>{
  try{
    const sellerId = req.user.id; // from JWT token
    const products = await Product.find({sellerId: req.auth?.userId}).sort({createdAt: -1});
    return res.json({products});
  }catch(err){
    return res.json({message: "failed to fetch products", error: err.message});
  };
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;  // Get sellerId from JWT token

    console.log("Product ID:", id);
    console.log("Seller ID:", sellerId);

    // Check if the product id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    console.log("Deleting Product with:", { _id: id, sellerId });

    // Ensure sellerId is passed as ObjectId
    const objectIdSeller = new mongoose.Types.ObjectId(sellerId);

    // Perform the deletion query
    const product = await Product.findOneAndDelete({ _id: id, sellerId: objectIdSeller });

    console.log("Deleted Product:", product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.json({ message: 'Product deleted successfully' });

  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
};


exports.updateProduct = async(req,res)=>{
  try{
  const {id}= req.params;
  const sellerId =req.user.id;
  const {quantity} = req.body;

    if(typeof quantity!='number' || quantity < 0){
      return res.status(400).json({message: "Invalid quantity"});
    }
    console.log("From JWT:", sellerId);
    const product = await Product.findOneAndUpdate(
      {_id: id, sellerId},
      {quantity},
      {new: true}
    );
    console.log("From DB:", product?.sellerId);

     if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }
    res.json(product);

}catch(err){
  console.error("error updating product: ", err);
  return res.status(500).json({error:"failed to update product"});  
}
   
}


// controllers/productController.js

// ... (keep all your other functions like getAllProducts, uploadProduct etc.)

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};