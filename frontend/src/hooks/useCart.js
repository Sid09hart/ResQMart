// src/hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../context/CartCreation';
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};