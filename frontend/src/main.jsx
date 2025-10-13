// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <-- This line must be here
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext'; // ✨ ADD THIS LINE

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider> {/* ✨ WRAP APP WITH CART PROVIDER */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)