// src/components/Footer.jsx

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input-Temp';
import { Button } from '@/components/ui/Button-Temp';
import { subscribeToNewsletter } from '../lib/api';
import Logo from './Logo';

// ✨ FIX: Restored full SVG code for the icons
const IconInstagram = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.305-1.457.718-2.123 1.385S.935 3.356.63 4.14C.333 4.905.13 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.26 2.148.558 2.913.306.783.718 1.457 1.385 2.123s1.34 1.08 2.123 1.385c.766.296 1.636.497 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.783-.305 1.457-.718 2.123-1.385s1.08-1.34 1.385-2.123c.297-.765.498-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.784-.718-1.457-1.385-2.123S20.643.935 19.86.63c-.765-.297-1.636-.498-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.07 1.17.05 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.248 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.06.36-2.23.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.056-1.805-.248-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.38-.164-.423-.36-1.06-.413-2.23-.057-1.265-.07-1.646-.07-4.85s.015-3.585.07-4.85c.05-1.17.248-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.38-.896.423-.164 1.057-.36 2.227-.413 1.265-.057 1.646-.07 4.85-.07zM12 6.84c-2.84 0-5.16 2.32-5.16 5.16s2.32 5.16 5.16 5.16 5.16-2.32 5.16-5.16-2.32-5.16-5.16-5.16zm0 8.482c-1.833 0-3.322-1.49-3.322-3.322s1.49-3.322 3.322-3.322 3.322 1.49 3.322 3.322-1.489 3.322-3.322 3.322zm5.438-8.85c-.822 0-1.49.668-1.49 1.49s.668 1.49 1.49 1.49 1.49-.668 1.49-1.49-.668-1.49-1.49-1.49z"/></svg>);
const IconTwitter = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.92 4.92 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.547 2.21c9.058 0 14.01-7.502 14.01-14.013 0-.213-.005-.426-.015-.637a10.025 10.025 0 002.46-2.548z"/></svg>);


export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await subscribeToNewsletter(email);
      setMessage(response.message);
      setEmail('');
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-gray-500 text-sm">Saving food, one delicious deal at a time.</p>
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm">
              <label htmlFor="email" className="text-sm font-semibold text-gray-600">Stay Updated</label>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-brand-green hover:bg-brand-green/90">Go</Button>
              </div>
              {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-green transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-green transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-green transition-colors">For Sellers</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-green transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; 2025 ResQMart. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Instagram</span><IconInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span><IconTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}