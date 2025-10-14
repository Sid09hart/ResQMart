// src/components/Hero.jsx
import React, { useRef, useState } from 'react'; // ✨ Import useState
import { useNavigate } from 'react-router-dom'; // ✨ Import useNavigate
import { motion, useScroll, useTransform } from 'framer-motion';
import { Input } from '@/components/ui/Input-Temp';
import { Button } from '@/components/ui/Button-Temp';


// A simple search icon component
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // This will make the children animate one by one
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
};

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // ✨ START: Logic for search functionality
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    // For now, we navigate to the main browse page.
    // In the future, we could pass the location as a query: navigate(`/browse?location=${location}`)
    navigate('/browse');
  };
  // ✨ END: Logic for search functionality

  return (
    <section 
      ref={targetRef}
      className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/images/hero-background1.jpg)',
          y: y
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <motion.div 
        className="relative z-20 text-center p-4 max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          variants={itemVariants}
        >
          Don't Let Good Food Go To Waste.
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-lg md:text-xl max-w-xl mx-auto text-gray-200"
          variants={itemVariants}
        >
          Rescue delicious, expiring goods from your favorite local stores at a bargain price.
        </motion.p>
        
        {/* ✨ Changed the motion.div to motion.form and added the onSubmit handler */}
        <motion.form 
          className="mt-8 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
          variants={itemVariants}
          onSubmit={handleSearch}
        >
          <Input 
            type="text" 
            placeholder="Enter your location or pincode..." 
            className="text-black flex-grow"
            // ✨ Added value and onChange to control the input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* ✨ Changed Button to type="submit" */}
          <Button type="submit" size="lg" className="bg-brand-orange hover:bg-brand-orange/90 font-bold">
            <SearchIcon />
            <span className="ml-2">Find Deals</span>
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}