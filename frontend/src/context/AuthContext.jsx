// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { getWishlistApi, addToWishlistApi, removeFromWishlistApi } from '../lib/api';
import { AuthContext } from './AuthCreation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const userResponse = await axios.get(`${API_URL}/auth/me`);
          setUser(userResponse.data);
          const wishlistResponse = await getWishlistApi();
          setWishlist(wishlistResponse);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
        }
      } else {
        setUser(null);
        setWishlist([]);
        delete axios.defaults.headers.common['Authorization'];
      }
      setIsLoading(false);
    };
    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
  };

  // ✨ START OF FIX
  const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    // After a successful registration, get the token and log the user in.
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token); // This will trigger the useEffect to fetch the user
  };
  // ✨ END OF FIX

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const addToWishlist = async (productId) => {
    const newWishlist = await addToWishlistApi(productId);
    setWishlist(newWishlist);
  };

  const removeFromWishlist = async (productId) => {
    const newWishlist = await removeFromWishlistApi(productId);
    setWishlist(newWishlist);
  };

  const value = { user, token, isLoading, login, register, logout, wishlist, addToWishlist, removeFromWishlist };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};