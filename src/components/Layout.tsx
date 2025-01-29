import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { School2, Users, AlertTriangle, Settings, LogOut } from 'lucide-react';
import { Card } from './ui/Card';
import { NavLink } from './navigation/NavLink';
import { Link } from 'react-router-dom';

export function Layout() {
  const { isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <Card className="mx-auto rounded-none rounded-b-2xl border-t-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors"
              >
                <School2 className="h-6 w-6" />
                <span className="font-semibold hidden sm:block">Student Council</span>
              </Link>

              <div className="flex items-center space-x-1 sm:space-x-4">
                <NavLink to="/students" icon={Users}>Students</NavLink>
                <NavLink to="/infractions" icon={AlertTriangle}>Infractions</NavLink>
                <NavLink to="/ban-types" icon={Settings}>Ban Types</NavLink>
                <button
                  onClick={logout}
                  className="flex items-center p-2 text-primary/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-1 hidden sm:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </nav>

      <main className="max-w-7xl mx-auto pt-24 p-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}