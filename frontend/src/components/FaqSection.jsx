// src/components/FaqSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion-temp";
import { Plus, Minus } from 'lucide-react';

// ✨ New, meaningful SVG illustration: "User with Green & Orange Questions"
const FaqIllustration = () => (
    <div className="relative w-48 h-48 flex justify-center items-center">
        {/* User Icon (Head & Shoulders) - Gray Outline */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full text-gray-300">
            {/* Body */}
            <circle cx="50" cy="70" r="30" stroke="currentColor" strokeWidth="6"/>
            {/* Head */}
            <circle cx="50" cy="35" r="20" stroke="currentColor" strokeWidth="6"/>
        </svg>

        {/* Green Question Mark */}
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="absolute w-16 h-16 text-brand-green" style={{ top: '10%', left: '15%' }}>
            <path d="M12 19.5C12.8284 19.5 13.5 18.8284 13.5 18C13.5 17.1716 12.8284 16.5 12 16.5C11.1716 16.5 10.5 17.1716 10.5 18C10.5 18.8284 11.1716 19.5 12 19.5Z" />
            <path d="M12 14.25C13.65 14.25 15 12.5 15 10.75C15 9 13.65 7.25 12 7.25C10.35 7.25 9 9 9 10.75C9 11.38 9.25 11.94 9.66 12.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Orange Question Mark */}
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="absolute w-16 h-16 text-brand-orange" style={{ top: '15%', right: '15%' }}>
            <path d="M12 19.5C12.8284 19.5 13.5 18.8284 13.5 18C13.5 17.1716 12.8284 16.5 12 16.5C11.1716 16.5 10.5 17.1716 10.5 18C10.5 18.8284 11.1716 19.5 12 19.5Z" />
            <path d="M12 14.25C13.65 14.25 15 12.5 15 10.75C15 9 13.65 7.25 12 7.25C10.35 7.25 9 9 9 10.75C9 11.38 9.25 11.94 9.66 12.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const faqData = [
  { question: "What exactly is ResQMart?", answer: "ResQMart is a marketplace that connects you with local stores and bakeries to rescue delicious, unsold food items at a discounted price. It's a simple way to save money while helping to reduce food waste in our community." },
  { question: "Is the food safe to eat?", answer: "Absolutely. All items on ResQMart are perfectly safe and high-quality. They are typically nearing their 'best before' date, not their 'use by' date, which means they are still fresh and delicious but need to be sold quickly." },
  { question: "How does the pickup process work?", answer: "After you purchase an item through the app, you'll receive a digital receipt and a pickup window. Simply visit the store during that time, show your receipt, and collect your rescued goods. It's that easy!" },
  { question: "Can I return an item I've purchased?", answer: "Due to the perishable nature of the goods and the deep discounts offered, all sales are final. We encourage you to carefully review the item description before making a purchase." }
];

export default function FaqSection() {
  return (
    <section className="bg-white py-12 md:py-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Column: Title and New Illustration */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-charcoal">Have a question?</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-md mx-auto lg:mx-0">
            We've got answers. If you can't find what you're looking for, feel free to contact our support team.
          </p>
          <div className="hidden lg:flex justify-center items-center mt-8 h-48">
            <FaqIllustration />
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="w-full">
          <Accordion type="single" collapsible>
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="group border-b">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  <span className="flex-grow">{item.question}</span>
                  <div className="ml-4">
                    <span className="group-data-[state=closed]:block hidden text-brand-green"><Plus/></span>
                    <span className="group-data-[state=open]:block hidden text-brand-orange"><Minus/></span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}