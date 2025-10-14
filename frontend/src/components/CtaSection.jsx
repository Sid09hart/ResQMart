// src/components/CtaSection.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input-Temp';
import { Button } from '@/components/ui/Button-Temp';
import { motion } from 'framer-motion';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function CtaSection() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/browse');
  };

  return (
    // ✨ Section now has a background image and an overlay
    <section 
      className="relative bg-cover bg-center py-20"
      style={{ backgroundImage: 'url(/images/cta-background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✨ The new Glassmorphic Card */}
        <motion.div
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to Rescue Your First Deal?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-200 max-w-2xl mx-auto">
            Join thousands of others in the fight against food waste. Your next great meal is just a search away.
          </p>
          
          <form 
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
            onSubmit={handleSearch}
          >
            <Input 
              type="text" 
              placeholder="Enter your location or pincode..." 
              className="bg-white/90 text-brand-charcoal placeholder:text-gray-500 border-0 flex-grow focus-visible:ring-brand-orange"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button type="submit" size="lg" className="bg-brand-orange hover:bg-brand-orange/90 font-bold border-0 text-white">
              <SearchIcon />
              <span className="ml-2">Find Deals Now</span>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}