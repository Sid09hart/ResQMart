// src/components/CategoriesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        name: 'Bakery',
        description: 'Freshly baked goods.',
        imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800',
        link: '/browse?category=Bakery'
    },
    {
        name: 'Produce',
        description: 'Fruits & Vegetables.',
        imageUrl: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=800',
        link: '/browse?category=Fruits%20%26%20Vegetables'
    },
    {
        name: 'Dairy & Eggs',
        description: 'Farm-fresh essentials.',
        // ✨ Corrected URL
        imageUrl: 'https://images.pexels.com/photos/7118901/pexels-photo-7118901.jpeg?auto=compress&cs=tinysrgb&q=80&w=800',
        link: '/browse?category=Dairy%20%26%20Eggs'
    },
    {
        name: 'Packaged Goods',
        description: 'Pantry staples.',
        // ✨ Corrected URL
        imageUrl: 'https://images.pexels.com/photos/27939228/pexels-photo-27939228.jpeg?_gl=1*1cnhw9l*_ga*MTMwMzA1MTg2OC4xNzYwMDIxMDU2*_ga_8JE65Q40S6*czE3NjAwMjMxNTAkbzIkZzEkdDE3NjAwMjQxMTckajI2JGwwJGgw',
        link: '/browse?category=Packaged%20Goods'
    }
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CategoryCard = ({ category }) => (
    <motion.div variants={itemVariants} className="relative rounded-xl overflow-hidden group shadow-lg">
        <Link to={category.link} className="block w-full h-96">
            <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-full object-cover transform-gpu group-hover:scale-110 transition-transform duration-500 ease-in-out" 
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black/30 backdrop-blur-lg border-t border-white/20 p-6 
                           group-hover:h-1/2 transition-all duration-500 ease-in-out">
                <div className="flex flex-col h-full">
                    <h3 className="text-white text-2xl font-bold tracking-wider">
                        {category.name}
                    </h3>
                    <div className="flex-grow flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <p className="text-gray-200 text-sm mb-2">{category.description}</p>
                        <div className="flex items-center text-brand-orange font-semibold">
                            <span>Shop Now</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </motion.div>
);

export default function CategoriesSection() {
    return (
        <section className="bg-white py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-charcoal">Explore Categories</h2>
                    <p className="mt-2 text-lg text-gray-500">Find the deals you're looking for.</p>
                </div>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {categories.map((category) => (
                        <CategoryCard key={category.name} category={category} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}