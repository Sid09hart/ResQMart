// src/components/ProductCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  
  // ✨ START OF NEW, MORE ROBUST DATE LOGIC
  const getBadgeInfo = (expiryDateString) => {
    if (!expiryDateString) {
      return { text: 'Date N/A', className: 'bg-gray-100 text-gray-800 border-gray-300' };
    }

    const expiry = new Date(expiryDateString);
    // Check if the date is valid
    if (isNaN(expiry.getTime())) {
        return { text: 'Invalid Date', className: 'bg-gray-100 text-gray-800 border-gray-300' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only, not times
    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return { text: 'Expired', className: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
    if (daysLeft === 0) {
      return { text: 'Expires Today', className: 'bg-red-100 text-red-800 border-red-300' };
    }
    if (daysLeft === 1) {
      return { text: 'Expires Tomorrow', className: 'bg-orange-100 text-orange-800 border-orange-300' };
    }
    return { text: `Expires in ${daysLeft} days`, className: 'bg-green-100 text-green-800 border-green-300' };
  };

  const badge = getBadgeInfo(product.expiryDate);
  // ✨ END OF NEW LOGIC

  return (
    <Link to={`/product/${product._id}`} className="flex flex-col h-full">
      <motion.div 
        className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col flex-grow"
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="relative">
          <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
          {badge && (
            <div className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full border ${badge.className}`}>
                {badge.text}
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-brand-charcoal mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">from {product.sellerName}</p>
          <div className="mt-auto">
            <div className="flex items-center mb-3">
              <p className="text-xl font-extrabold text-brand-green mr-2">${(product.discountedPrice ?? 0).toFixed(2)}</p>
              <p className="text-sm text-gray-400 line-through">${(product.price ?? 0).toFixed(2)}</p>
            </div>
            <Button className="w-full bg-brand-green hover:bg-brand-green/90 font-bold pointer-events-none">View Deal</Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}