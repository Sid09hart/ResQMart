// src/pages/BecomeSellerPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { applyToSellApi } from '../lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = ({ onSubmit }) => {
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ storeName, storeAddress });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} required placeholder="e.g., The Corner Bakery" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea id="storeAddress" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} required placeholder="123 Main St, Anytown, USA" />
            </div>
            <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90">Submit Application</Button>
        </form>
    );
};

export default function BecomeSellerPage() {
    const { user, login } = useAuth(); // We might need to refresh user state
    const navigate = useNavigate();

    const handleApplicationSubmit = async (applicationData) => {
        try {
            const response = await applyToSellApi(applicationData);
            toast.success(response.message);
            // This is a simple way to refresh the user state to show the 'pending' status
            // A more advanced solution would involve a dedicated 'refetchUser' function in AuthContext
            await login(user.email, user.password); // A bit of a hack to refresh user
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || "Failed to submit application.");
        }
    };

    const renderContent = () => {
        if (user?.role === 'seller') {
            return <CardDescription>You are already a verified seller. You can list items from your dashboard.</CardDescription>;
        }
        if (user?.sellerApplication?.status === 'pending') {
            return <CardDescription>Your application is currently under review. We'll notify you via email once a decision has been made.</CardDescription>;
        }
        return (
            <>
                <CardDescription>Fill out the form below to apply to become a seller on ResQMart. We'll review your application and get back to you soon.</CardDescription>
                <ApplicationForm onSubmit={handleApplicationSubmit} />
            </>
        );
    };

    return (
        <div className="flex justify-center py-12 px-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Become a Seller</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
}