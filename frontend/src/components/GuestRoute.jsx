// src/components/GuestRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function GuestRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    // If the user is logged in, redirect them away from the guest page
    return <Navigate to="/" replace />;
  }

  // If the user is not logged in, show the page (Login or Register)
  return children;
}