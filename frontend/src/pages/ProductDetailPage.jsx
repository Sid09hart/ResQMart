// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { fetchProductById } from '../lib/api';
import { Button } from '@/components/ui/Button-Temp';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user, wishlist, addToWishlist, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please log in to add items to your cart.");
      navigate('/login');
      return;
    }
    addToCart(product._id, 1);
    toast.success(`${product.name} has been added to your cart!`);
  };

  const isWishlisted = wishlist.some(item => item._id === product?._id);

  const handleWishlistToggle = () => {
    if (!user) {
      toast.warning("Please log in to manage your wishlist.");
      navigate('/login');
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(product._id);
      toast.info(`${product.name} has been removed from your wishlist.`);
    } else {
      addToWishlist(product._id);
      toast.success(`${product.name} has been added to your wishlist!`);
    }
  };

  if (isLoading) return <div className="text-center p-20">Loading product...</div>;
  if (error) return <div className="text-center p-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center p-20">Product not found.</div>;
  
  const position = [product.location.coordinates[1], product.location.coordinates[0]];

  // ✨ START: New logic to check if product is expired
  const calculateDaysLeft = (expiryDateString) => {
    if (!expiryDateString) return -1;
    const expiry = new Date(expiryDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft(product.expiryDate);
  const isPurchasable = product.quantity > 0 && daysLeft >= 0;
  // ✨ END: New logic

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="w-full">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>

          <div className="space-y-4 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-charcoal">{product.name}</h1>
            <p className="text-lg text-gray-500">Sold by: <span className="font-semibold text-brand-green">{product.sellerName}</span></p>
            
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-extrabold text-brand-green">${(product.discountedPrice ?? 0).toFixed(2)}</p>
              <p className="text-xl text-gray-400 line-through">${(product.price ?? 0).toFixed(2)}</p>
            </div>

            <div className="bg-orange-100 text-orange-800 border border-orange-300 rounded-md p-3 text-center font-semibold">
              Expires on: {new Date(product.expiryDate).toLocaleDateString()}
            </div>
            
            {product.quantity > 0 && daysLeft >= 0 ? (
                <p className="text-gray-600"><span className="font-semibold">Quantity available:</span> {product.quantity}</p>
            ) : (
                <p className="font-semibold text-red-500">{daysLeft < 0 ? "This item has expired" : "Out of Stock"}</p>
            )}
            
            <p className="text-gray-600"><span className="font-semibold">Category:</span> {product.category}</p>
            
            <div className="pt-4 mt-auto">
              {/* ✨ FIX: Conditional button logic now checks if the item is purchasable */}
              {isPurchasable ? (
                <Button 
                  size="lg" 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 font-bold text-lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full font-bold text-lg border-brand-green text-brand-green hover:bg-green-50 hover:text-brand-green"
                  onClick={handleWishlistToggle}
                >
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Pickup Location</h2>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg border">
              <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup>{product.sellerName}</Popup>
                </Marker>
              </MapContainer>
            </div>
        </div>
      </div>
    </div>
  );
}