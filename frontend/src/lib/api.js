// src/lib/api.js
// src/lib/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const LOCAL_API = import.meta.env.VITE_LOCAL_API_URL;


// ✨ Update the function to accept a 'limit' parameter
export const fetchProducts = async (filters, userLocation, limit) => {
  try {
    const params = new URLSearchParams();

    if (filters.categories && filters.categories.length > 0) {
      params.append('category', filters.categories.join(','));
    }
    if (userLocation) {
      params.append('latitude', userLocation.latitude);
      params.append('longitude', userLocation.longitude);
    }
    if (filters.distance) {
      params.append('maxDistance', filters.distance);
    }
    if (filters.sortBy) {
      params.append('sortBy', filters.sortBy);
    }
    // ✨ Add the limit to the query if it exists
    if (limit) {
      params.append('limit', limit);
    }
    
    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;

  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// ... (keep fetchProducts)

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/newsletter/subscribe`, { email });
    return response.data;
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error.response.data;
  }
};

export const uploadProduct = async (formData) => {
  try {
    // Axios will automatically set the correct 'Content-Type' for FormData
    const response = await axios.post(`${API_URL}/products/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error.response.data;
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error.response.data;
  }
};

export const addToCartApi = async (productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/cart/add`, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error.response.data;
  }
};

export const removeFromCartApi = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/remove/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error.response.data;
  }
};

export const createOrderApi = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response.data;
  }
};

export const getWishlistApi = async () => {
    const response = await axios.get(`${API_URL}/wishlist`);
    return response.data;
};

export const addToWishlistApi = async (productId) => {
    const response = await axios.post(`${API_URL}/wishlist/add/${productId}`);
    return response.data;
};

export const removeFromWishlistApi = async (productId) => {
    const response = await axios.delete(`${API_URL}/wishlist/remove/${productId}`);
    return response.data;
};

export const getMyPurchasesApi = async () => {
    const response = await axios.get(`${API_URL}/orders/my-purchases`);
    return response.data;
};

export const getMyListingsApi = async () => {
    const response = await axios.get(`${API_URL}/products/my-listings`);
    return response.data.products;
};

export const applyToSellApi = async (applicationData) => {
    const response = await axios.post(`${API_URL}/users/apply-to-sell`, applicationData);
    return response.data;
};

export const generateDescriptionApi = async (keywords) => 
{
  const response = await axios.post(`${API_URL}/ai/generate-description`, { keywords });
  // const response1 = await axios.post(`${LOCAL_API}/ai/generate-description`, { keywords });

  return response.data;
};
