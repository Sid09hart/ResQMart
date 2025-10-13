// src/components/ImpactSection.jsx

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';

// ... (AnimatedCounter component remains the same)
function AnimatedCounter({ to }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(0, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = new Intl.NumberFormat('en-US').format(value.toFixed(0));
          }
        },
      });
    }
  }, [isInView, to]);

  return <span ref={ref}>0</span>;
}

export default function ImpactSection() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [-1, 0.6], ["100%", "0%"]);

  return (
    <section ref={sectionRef} className="relative text-white py-12 md:py-20 overflow-hidden">
      
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/impact-background.jpg)`,
          x: x
        }}
      />
      
      <div className="absolute inset-0 bg-brand bg-green-950/20"></div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Join Our Food Rescue Mission</h2>
          <p className="mt-2 text-lg text-green-100 max-w-2xl mx-auto">
            Every purchase you make contributes to a greener planet and a stronger local community. Here's the impact we've made together so far.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="text-5xl md:text-6xl font-bold">
              <AnimatedCounter to={1200} />+
            </div>
            <p className="text-lg mt-2 text-green-200">kg of Food Saved</p>
          </div>

          <div className="p-4">
            <div className="text-5xl md:text-6xl font-bold">
              $<AnimatedCounter to={8500} />+
            </div>
            <p className="text-lg mt-2 text-green-200">Saved by Shoppers</p>
          </div>

          <div className="p-4">
            {/* ✨ FIX: Corrected '5xl' to 'text-5xl' */}
            <div className="text-5xl md:text-6xl font-bold">
              <AnimatedCounter to={2500} />+
            </div>
            {/* ✨ FIX: Corrected 'lg' to 'text-lg' */}
            <p className="text-lg mt-2 text-green-200">Meals Provided</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}