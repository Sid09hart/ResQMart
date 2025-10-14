// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/Button-Temp';
import { Input } from '@/components/ui/Input-Temp';
import { Label } from '@/components/ui/Label-Temp';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card-Temp';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // ✨ FIX: No longer sends 'seller' role
      await register(username, email, password);
      navigate('/'); // Redirect to homepage on successful registration
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* ✨ FIX: Updated title and description for all users */}
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join ResQMart and start rescuing food today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {/* ✨ FIX: Updated label */}
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green/90">Create Account</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline font-semibold text-brand-green">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}