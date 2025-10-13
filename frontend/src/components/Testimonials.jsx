// src/components/Testimonialimport React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { Card, CardContent } from '@/components/ui/Card';


const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Happy Shopper',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    quote: "I love ResQMart! I've discovered so many local bakeries and saved a ton on delicious bread that would have otherwise gone to waste. It's a win-win!"
  },
  {
    name: 'Mike P.',
    role: 'Local Grocer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    quote: "This platform is a game-changer for my store. I've reduced my daily waste significantly and even gained new regular customers who found me through the app."
  },
  {
    name: 'Linda K.',
    role: 'Eco-conscious Mom',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    quote: "As a mom, I'm always looking for ways to save money and teach my kids about sustainability. ResQMart helps me do both. Highly recommended!"
  }
];

// ✨ Animation variants for the container and the items
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // This will make each card animate in with a small delay
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

export default function Testimonials() {
  return (
    <section className="bg-brand-gray py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-charcoal">What Our Community Says</h2>
          <p className="mt-2 text-lg text-gray-500">Real stories from real users and partners.</p>
        </div>
        
        {/* ✨ Wrap the grid in a motion.div */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when the element is in the viewport
          viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% of it is visible
        >
          {testimonials.map((testimonial, index) => (
            // ✨ Each card is now a motion.div
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col h-full"> {/* h-full ensures all cards are the same height */}
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-bold text-brand-charcoal">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 italic border-l-4 border-brand-green pl-4 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}