// src/components/ProductGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } };

// ✨ It now accepts a 'products' prop
export default function ProductGrid({ products }) {
  if (!products || products.length === 0) { // Added a check for undefined products
    return <p className="text-gray-500">No products found. Try adjusting your filters!</p>;
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm-grid-cols-2 xl:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map(product => (
        // ✨ FIX: Changed key from product.id to product._id
        <motion.div key={product._id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}