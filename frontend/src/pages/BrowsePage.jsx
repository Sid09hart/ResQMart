// src/pages/BrowsePage.jsx
import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner'; // ✨ IMPORT the new component



export default function BrowsePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    distance: 10,
    sortBy: 'expiry_soonest',
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✨ This useEffect now has detailed logging
  useEffect(() => {
    console.log("1. Attempting to get user location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("2. SUCCESS: Got location data from browser:", position.coords);
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (geoError) => {
          // This will show us the specific reason for failure
          console.error("2. ERROR: Failed to get location.", geoError);
          setError("Location access denied or unavailable. Distance filtering will be disabled.");
          setUserLocation({ latitude: 0, longitude: 0 }); // Fallback location
        }
      );
    } else {
        console.error("2. ERROR: Geolocation is not supported by this browser.");
        setUserLocation({ latitude: 0, longitude: 0 }); // Fallback for old browsers
    }
  }, []); // Runs only once on component mount


  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prevFilters => {
      if (filterType === 'categories') {
        const newCategories = checked 
          ? [...prevFilters.categories, value] 
          : prevFilters.categories.filter(cat => cat !== value);
        return { ...prevFilters, categories: newCategories };
      }
      return { ...prevFilters, [filterType]: value };
    });
  };
  
  useEffect(() => {
    if (!userLocation) return;

    // ✨ START OF RESTORED LOGIC
    const getProducts = async () => {
            console.log("4. Making API call with location and filters:", { userLocation, filters });
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(filters, userLocation);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.',err);
      } finally {
        setIsLoading(false);
      }
    };
    // ✨ END OF RESTORED LOGIC

    getProducts();
  }, [filters, userLocation]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-charcoal tracking-tight">All Deals</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Use the filters to find exactly what you're looking for.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
        <aside className="lg:col-span-1 mb-8 lg:mb-0">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </aside>
        <div className="lg:col-span-3">
           {/* ✨ FIX: Use the LoadingSpinner component when isLoading is true */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}