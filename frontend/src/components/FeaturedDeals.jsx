// src/components/FeaturedDeals.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../lib/api'; // ✨ Import API function

// ✨ An icon for our "View All" button
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Mock data for development
const mockProducts = [
  // ... (your existing mockProducts array)
  { id: 1, name: 'Artisan Sourdough Bread', seller: 'The Corner Bakery', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400', originalPrice: 8.00, discountedPrice: 4.00, expiresInDays: 1 },
  { id: 2, name: 'Organic Avocados (Pack of 3)', seller: 'Green Grocers', image: 'https://images.unsplash.com/photo-1523746193-941179261319?q=80&w=400', originalPrice: 6.50, discountedPrice: 3.25, expiresInDays: 3 },
  { id: 3, name: 'Fresh Milk - 1L Carton', seller: 'Daily Dairy Co.', image: 'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=400', originalPrice: 3.00, discountedPrice: 1.50, expiresInDays: 5 },
];

// ✨ Animation variants for the container and the items
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FeaturedDeals() {
  // ✨ Add state for products, loading, and errors
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✨ Fetch data when the component mounts
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        // Fetch the 3 products expiring soonest
        const data = await fetchProducts({ sortBy: 'expiry_soonest' }, null, 3);
        setProducts(data);
      } catch (err) {
        setError('Could not load featured deals.',err);
      } finally {
        setIsLoading(false);
      }
    };
    getFeaturedProducts();
  }, []); // Empty array means this runs only once

  return (
    <section className="bg-brand-gray py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-charcoal">Featured Deals Nearby</h2>
            <p className="mt-2 text-lg text-gray-500">Get these amazing deals before they're gone!</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex items-center text-brand-green hover:text-brand-green font-semibold">
            <Link to="/browse">
              <span>View All Deals</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>

        {/* ✨ Conditional rendering for loading/error/success states */}
        {isLoading ? (
          <p>Loading deals...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map(product => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}