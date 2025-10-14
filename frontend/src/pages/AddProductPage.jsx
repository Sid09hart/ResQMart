// src/pages/AddProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button-Temp';
import { Input } from '@/components/ui/Input-Temp';
import { Label } from '@/components/ui/Label-Temp';
import { Textarea } from '@/components/ui/Textarea-Temp';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card-Temp';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover-Temp';
import { Calendar } from '@/components/ui/Calendar-Temp';
import { uploadProduct } from '../lib/api';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Package, Tag, FileImage, MapPin } from 'lucide-react';
import MapInput from '../components/MapInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select-Temp';
import { useAuth } from '../hooks/useAuth';

const FormSection = ({ title, icon, children }) => (

    <div className="space-y-4 pt-6">
        <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">{icon}</div>
            <h3 className="text-xl font-semibold text-brand-charcoal">{title}</h3>
        </div>
        {children}
    </div>
);


export default function AddProductPage() {
      const { user } = useAuth(); // ✨ Get the user from our context

  const [formData, setFormData] = useState({
    name: '',
    category: '', // This will now be controlled by the Select component
    price: '',
    quantity: '',
    description: ''
  });
  const [expiryDate, setExpiryDate] = useState(null);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => console.error("Could not get location:", err)
    );
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // ✨ A new handler specifically for the category dropdown
  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
   const handleMapLocationChange = (newLocation) => {
        setLocation(newLocation);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !expiryDate || !location || !formData.category) {
      setError('Please fill all fields, including image, expiry date, category, and allow location.');
      return;
    }
    setIsLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', image);
    data.append('expiryDate', expiryDate.toISOString());
    data.append('latitude', location.latitude);
    data.append('longitude', location.longitude);

    try {
      await uploadProduct(data);
      navigate('/browse');
    } catch (err) {
      setError(err.message || 'Failed to upload product.');
    } finally {
      setIsLoading(false);
    }
  };

   // ✨ START: Verification Check goes here
  // This code runs before rendering the form.
  if (!user) {
    // This case is handled by ProtectedRoute, but this is a good safeguard.
    return <div className="p-8 text-center">Loading user data...</div>;
  }

  if (user.role === 'seller' && !user.isVerifiedSeller) {
    return (
      <div className="flex justify-center py-12 px-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Account Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Thank you for registering! Your seller account is currently under review by our team.
              This process usually takes 24-48 hours. We'll notify you via email once your account is approved.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  // ✨ END: Verification Check


  return (
<div className="bg-brand-gray/50 py-12 px-4">
            <Card className="w-full max-w-3xl mx-auto shadow-2xl rounded-xl">
                {/* ✨ New Branded Header */}
                <CardHeader className="bg-brand-green text-white p-6 rounded-t-xl text-center">
                    <CardTitle className="text-3xl font-bold">List a New Item for Rescue</CardTitle>
                    <CardDescription className="text-green-100 mt-1">
                        Fill out the details below to save your delicious items from waste.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* ✨ Section 1: Product Details */}
                        <FormSection title="Product Details" icon={<Package className="text-brand-green"/>}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><Label htmlFor="name">Product Name</Label><Input id="name" value={formData.name} onChange={handleInputChange} required /></div>
                                <div className="space-y-2"><Label htmlFor="category">Category</Label><Select onValueChange={handleCategoryChange} value={formData.category}><SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger><SelectContent><SelectItem value="Bakery">Bakery</SelectItem><SelectItem value="Fruits & Vegetables">Fruits & Vegetables</SelectItem><SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem><SelectItem value="Packaged Goods">Packaged Goods</SelectItem></SelectContent></Select></div>
                            </div>
                            <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" value={formData.description} onChange={handleInputChange} placeholder="Tell buyers more about this item..." /></div>
                        </FormSection>

                        {/* ✨ Section 2: Pricing & Availability */}
                        <FormSection title="Pricing & Availability" icon={<Tag className="text-brand-green"/>}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><Label htmlFor="price">Original Price ($)</Label><Input id="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} required /></div>
                                <div className="space-y-2"><Label htmlFor="quantity">Quantity</Label><Input id="quantity" type="number" value={formData.quantity} onChange={handleInputChange} required /></div>
                            </div>
                        </FormSection>

                        {/* ✨ Section 3: Image & Expiry */}
                        <FormSection title="Image & Expiry" icon={<FileImage className="text-brand-green"/>}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="space-y-2"><Label htmlFor="image">Product Image</Label><Input id="image" type="file" onChange={handleFileChange} required /></div>
                                <div className="space-y-2"><Label>Best Before / Expiry Date</Label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 z-50"><Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus /></PopoverContent></Popover></div>
                            </div>
                        </FormSection>

                        {/* ✨ Section 4: Location */}
                        <FormSection title="Pickup Location" icon={<MapPin className="text-brand-green"/>}>
                            <p className="text-sm text-gray-500">Click on the map to set the precise pickup point for your item.</p>
                            <MapInput onLocationChange={handleMapLocationChange} />
                        </FormSection>

                        {error && <p className="text-red-500 text-sm text-center pt-4">{error}</p>}
                        <div className="pt-6">
                          <Button type="submit" size="lg" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-lg" disabled={isLoading}>
                              {isLoading ? 'Listing Item...' : 'List Item for Rescue'}
                          </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );

}