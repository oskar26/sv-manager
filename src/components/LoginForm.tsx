import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { School2 } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl" />
            <School2 className="relative w-20 h-20 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Student Council
          </h2>
          <p className="mt-2 text-sm text-primary/60">
            Manage student infractions and room bans
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50/50 backdrop-blur-sm text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full px-3 py-2"
              placeholder="Enter password"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}