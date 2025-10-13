// src/components/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      {/* A styled text-based logo using the Poppins font and brand colors */}
      <span className="text-3xl font-bold font-sans tracking-tight">
        <span className="text-brand-green text-4xl">R</span>
        <span className="text-brand-green text-3xl">es</span>
        <span className="text-brand-orange text-4xl">Q</span>
        <span className="text-brand-charcoal text-3xl">M</span>
        <span className="text-brand-charcoal text-3xl">art</span>
      </span>
    </Link>
  );
}