// src/pages/WishlistPage.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
    const { wishlist } = useAuth();

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-brand-charcoal">My Wishlist</h1>
                <p className="mt-2 text-lg text-gray-600">Items you're watching. We'll notify you when they're back in stock!</p>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlist.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 border-dashed border-2 rounded-lg">
                    <p className="text-lg font-semibold">Your wishlist is empty.</p>
                    <p className="text-sm text-gray-500 mt-2">Out-of-stock items you add to your wishlist will appear here.</p>
                    <Button asChild className="mt-6 bg-brand-green hover:bg-brand-green/90">
                        <Link to="/browse">Browse Deals</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}