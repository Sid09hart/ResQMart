// src/components/FeaturedStores.jsx
import React from 'react';
import { motion } from 'framer-motion';

// ✨ New, multi-color SVG logos
const BakeryLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 30 C 20 30, 20 70, 50 70 C 80 70, 80 30, 50 30 Z" stroke="#A16207" strokeWidth="5" fill="#FEF3C7"/>
        <path d="M40 40 C 45 35, 55 35, 60 40" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
        <path d="M35 50 C 40 45, 60 45, 65 50" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 60 C 45 55, 55 55, 60 60" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
    </svg>
);
const GroceryLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 80 L25 30 Q 25 20, 35 20 L 65 20 Q 75 20, 75 30 L 75 80 Z" stroke="#15803D" strokeWidth="5" fill="#ECFDF5" />
        <circle cx="35" cy="25" r="10" stroke="#15803D" strokeWidth="5" />
        <circle cx="65" cy="25" r="10" stroke="#15803D" strokeWidth="5" />
        <circle cx="35" cy="85" r="5" fill="#2A2A2A" />
        <circle cx="65" cy="85" r="5" fill="#2A2A2A" />
    </svg>
);
const DairyLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="20" width="40" height="60" rx="10" stroke="#0284C7" strokeWidth="5" fill="#EFF6FF" />
        <path d="M40 50 Q 50 40, 60 50 T 80 50" stroke="#0284C7" strokeWidth="5" />
        <rect x="30" y="20" width="40" height="20" fill="#0284C7" rx="10"/>
    </svg>
);
const FarmLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C 80 40, 80 70, 50 90 C 20 70, 20 40, 50 10 Z" stroke="#DC2626" strokeWidth="5" fill="#FEF2F2"/>
        <path d="M50 50 L 50 90 M 30 60 L 70 60" stroke="#DC2626" strokeWidth="5" />
        <path d="M50 10 L 60 30" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
    </svg>
);


const stores = [
    { name: "The Corner Bakery", logo: <BakeryLogo /> },
    { name: "Green Grocers", logo: <GroceryLogo /> },
    { name: "Daily Dairy Co.", logo: <DairyLogo /> },
    { name: "Orchard Farms", logo: <FarmLogo /> }
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FeaturedStores() {
    return (
        <section className="bg-gray-50 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-charcoal">Featured Local Partners</h2>
                    <p className="mt-2 text-lg text-gray-500">Proudly working with stores in your community.</p>
                </div>
                
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {stores.map((store) => (
                        <motion.div 
                            key={store.name} 
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 cursor-pointer"
                        >
                            <div className="w-24 h-24">
                                {store.logo}
                            </div>
                            <p className="mt-4 font-semibold text-brand-charcoal text-center">{store.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}