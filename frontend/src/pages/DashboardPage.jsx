// src/pages/DashboardPage.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import PurchasesTab from '../components/dashboard/PurchasesTab';
import ListingsTab from '../components/dashboard/ListingsTab'; // ✨ IMPORT
import { Card, CardDescription, CardTitle } from '@/components/ui/Card-Temp';
import { Button } from '@/components/ui/Button-Temp';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-brand-charcoal">My Dashboard</h1>
                <p className="mt-2 text-lg text-gray-600">Welcome back, {user?.username}!</p>
            </div>

            {/* ✨ Add this block for non-sellers */}
            {user?.role === 'buyer' && user?.sellerApplication?.status !== 'pending' && (
                <Card className="mb-8 text-center p-6">
                    <CardTitle className="mb-2">Want to sell your own items?</CardTitle>
                    <CardDescription className="mb-4">Join our community of sellers and help reduce food waste.</CardDescription>
                    <Button asChild><Link to="/become-a-seller">Apply to Become a Seller</Link></Button>
                </Card>
            )}


            <Tabs defaultValue="purchases" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
                    <TabsTrigger value="purchases">My Purchases</TabsTrigger>
                    {user?.role === 'seller' && (
                        <TabsTrigger value="listings">My Listings</TabsTrigger>
                    )}
                </TabsList>
                <TabsContent value="purchases" className="mt-6">
                    <PurchasesTab />
                </TabsContent>
                 {user?.role === 'seller' && (
                    <TabsContent value="listings" className="mt-6">
                        {/* ✨ Replace the placeholder with the new component */}
                        <ListingsTab />
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}