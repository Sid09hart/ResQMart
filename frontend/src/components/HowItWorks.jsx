// src/components/HowItWorks.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { MapPin, CreditCard, ShoppingBag } from 'lucide-react'; // Using more modern icons

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const StepCard = ({ number, title, description, icon }) => (
    <motion.div variants={itemVariants} className="w-full">
        <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative p-8 text-center">
            {/* Large number in the background */}
            <span className="absolute top-0 right-0 text-gray-100 font-extrabold text-8xl -translate-y-4 translate-x-4 z-0">
                {number}
            </span>
            <div className="relative z-10">
                <div className="mx-auto flex items-center justify-center h-16 w-16 bg-brand-green/10 rounded-full mb-6">
                    {icon}
                </div>
                <CardTitle className="mb-2 text-xl font-bold">{title}</CardTitle>
                <CardDescription className="text-gray-600">{description}</CardDescription>
            </div>
        </Card>
    </motion.div>
);

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-charcoal">How It Works</h2>
          <p className="mt-4 text-xl text-gray-500">Rescue delicious food in 3 simple steps.</p>
        </div>

        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Animated Dashed Line */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-px z-0">
            <motion.div 
              className="h-full w-2/3 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "66.66%" }}
              viewport={{ once: true, amount: "all" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                backgroundImage: `linear-gradient(to right, #D1D5DB 50%, transparent 50%)`,
                backgroundSize: '16px 2px',
                backgroundRepeat: 'repeat-x',
                borderTop: '2px dashed transparent'
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
                number="01" 
                title="Discover Deals" 
                description="Browse amazing deals on delicious food from local sellers near you." 
                icon={<MapPin className="w-8 h-8 text-brand-green"/>} 
            />
            <StepCard 
                number="02" 
                title="Purchase Online" 
                description="Secure your items with easy and safe online payment." 
                icon={<CreditCard className="w-8 h-8 text-brand-green"/>} 
            />
            <StepCard 
                number="03" 
                title="Collect & Enjoy" 
                description="Pick up your order at the scheduled time. Enjoy your food and savings!" 
                icon={<ShoppingBag className="w-8 h-8 text-brand-green"/>} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}