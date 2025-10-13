// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import MockPaymentModal from '../components/MockPaymentModal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { createOrderApi } from '../lib/api';
import { toast } from 'sonner';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const DELIVERY_FEE = 5.00;

export default function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCart();
    const { user } = useAuth();
    const [deliveryType, setDeliveryType] = useState('pickup');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactDetails, setContactDetails] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });
    const navigate = useNavigate();

    // Pre-fill contact details when user data is available
    useEffect(() => {
        if (user) {
            setContactDetails(prev => ({
                ...prev,
                fullName: user.username || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    // Handle case where cart is empty
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-brand-charcoal">Your Cart is Empty</h1>
                <p className="mt-4">You have no items in your cart to check out.</p>
                <Button asChild className="mt-8 bg-brand-green hover:bg-brand-green/90">
                    <Link to="/browse">Find Deals to Rescue</Link>
                </Button>
            </div>
        );
    }

    const firstProduct = cartItems[0]?.product;
    const pickupPosition = firstProduct ? [firstProduct.location.coordinates[1], firstProduct.location.coordinates[0]] : null;
    const total = deliveryType === 'delivery' ? subtotal + DELIVERY_FEE : subtotal;

    const handlePayment = () => setIsModalOpen(true);
    
    const handleSuccess = async () => {
        try {
          await createOrderApi({
            cartItems,
            deliveryType,
            shippingAddress: deliveryType === 'delivery' ? shippingAddress : null,
            contactDetails,
            totalAmount: total,
          });
          clearCart();
          toast.success("Order placed successfully!");
          navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
          console.error("Failed to create order:", error);
          toast.error("There was an issue creating your order. Please try again.");
        }
    };
    
    const handleFailure = () => {
        toast.error("Payment was canceled.");
        navigate('/checkout');
    };
    
    const handleContactChange = (e) => {
        setContactDetails(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleAddressChange = (e) => {
        setShippingAddress(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <>
            <div className="max-w-6xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-extrabold text-center mb-8">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="bg-white p-6 rounded-lg shadow space-y-6">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                item.product && (
                                    <div key={item.product._id} className="flex items-start gap-4">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md border" />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${(item.product.discountedPrice * item.quantity).toFixed(2)}</p>
                                    </div>
                                )
                            ))}
                        </div>
                        <hr/>
                        <div className="space-y-2">
                            <div className="flex justify-between"><p>Subtotal:</p><p>${subtotal.toFixed(2)}</p></div>
                            {deliveryType === 'delivery' && <div className="flex justify-between"><p>Delivery Fee:</p><p>${DELIVERY_FEE.toFixed(2)}</p></div>}
                            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><p>Total:</p><p>${total.toFixed(2)}</p></div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow space-y-6">
                            <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
                            <div className="space-y-4">
                                <div className="space-y-1"><Label htmlFor="fullName">Full Name</Label><Input id="fullName" value={contactDetails.fullName} onChange={handleContactChange} required /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={contactDetails.email} onChange={handleContactChange} required /></div>
                                    <div className="space-y-1"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={contactDetails.phone} onChange={handleContactChange} placeholder="(Optional)" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow space-y-6">
                            <h2 className="text-xl font-semibold mb-4">Delivery Option</h2>
                            <RadioGroup defaultValue="pickup" onValueChange={setDeliveryType} className="space-y-4">
                                <Label htmlFor="pickup" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-brand-green"><RadioGroupItem value="pickup" id="pickup" /><span>Store Pickup (Free)</span></Label>
                                <Label htmlFor="delivery" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-brand-green"><RadioGroupItem value="delivery" id="delivery" /><span>Home Delivery (+${DELIVERY_FEE.toFixed(2)})</span></Label>
                            </RadioGroup>
                            {deliveryType === 'delivery' && (
                                <div className="mt-6 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1"><Label htmlFor="street">Street Address</Label><Input id="street" value={shippingAddress.street} onChange={handleAddressChange} required /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1"><Label htmlFor="city">City</Label><Input id="city" value={shippingAddress.city} onChange={handleAddressChange} required /></div>
                                            <div className="space-y-1"><Label htmlFor="state">State</Label><Input id="state" value={shippingAddress.state} onChange={handleAddressChange} required /></div>
                                        </div>
                                        <div className="space-y-1"><Label htmlFor="zip">ZIP Code</Label><Input id="zip" value={shippingAddress.zip} onChange={handleAddressChange} required /></div>
                                    </div>
                                </div>
                            )}
                            {deliveryType === 'pickup' && firstProduct && pickupPosition && (
                                <div className="mt-6 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-semibold mb-4">Pickup Location</h3>
                                    <p className="text-sm text-gray-600 mb-4">Pick up from: <span className="font-medium">{firstProduct.sellerName}</span></p>
                                    <div className="h-64 rounded-lg overflow-hidden border">
                                        <MapContainer center={pickupPosition} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={pickupPosition}><Popup>{firstProduct.sellerName}</Popup></Marker></MapContainer>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button onClick={handlePayment} className="w-full bg-brand-orange hover:bg-brand-orange/90 text-lg">
                            Proceed to Payment
                        </Button>
                    </div>
                </div>
            </div>
            {isModalOpen && (<MockPaymentModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} total={total} onSuccess={handleSuccess} onFailure={handleFailure} />)}
        </>
    );
}