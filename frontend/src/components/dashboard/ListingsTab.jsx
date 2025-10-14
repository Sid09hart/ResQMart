// src/components/dashboard/ListingsTab.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { getMyListingsApi } from '../../lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card-Temp';
import { Button } from '@/components/ui/Button-Temp';
import { Link } from 'react-router-dom';
import { Trash2, Edit } from 'lucide-react';

export default function ListingsTab() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await getMyListingsApi();
                setListings(data);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    if (isLoading) return <p>Loading your product listings...</p>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Product Listings</h2>
                <Button asChild className="bg-brand-green hover:bg-brand-green/90">
                    <Link to="/add-product">List a New Item</Link>
                </Button>
            </div>
            {listings.length === 0 ? (
                <p>You haven't listed any products yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {listings.map(product => (
                        <Card key={product._id} className="flex flex-col">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg border" />
                                <div className="flex-grow">
                                    <CardTitle>{product.name}</CardTitle>
                                    <CardDescription className="mt-1">
                                        <span className="font-semibold text-brand-green">${product.discountedPrice.toFixed(2)}</span>
                                        <span className="line-through text-gray-400 ml-2">${product.price.toFixed(2)}</span>
                                    </CardDescription>
                                    <p className="text-sm text-gray-500 mt-2">Quantity: {product.quantity}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-auto flex gap-2">
                                <Button variant="outline" className="w-full">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}