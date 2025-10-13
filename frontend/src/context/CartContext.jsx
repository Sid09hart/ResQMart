// src/context/CartContext.jsx
import React, {  useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCart, addToCartApi, removeFromCartApi } from '../lib/api';
import { CartContext } from './CartCreation';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const cartData = await getCart();
          setCartItems(cartData);
        } catch (error) {
          console.error("Failed to fetch initial cart.",error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await addToCartApi(productId, quantity);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Failed to add item to cart.",error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeFromCartApi(productId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Failed to remove item from cart.",error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);

  const subtotal = cartItems.reduce((total, item) => {
    if (item.product && typeof item.product.discountedPrice === 'number') {
      return total + item.product.discountedPrice * item.quantity;
    }
    return total;
  }, 0);

  const value = { cartItems, isLoading, addToCart, removeFromCart, clearCart, cartCount, subtotal };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

