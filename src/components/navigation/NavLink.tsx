import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export function NavLink({ to, icon: Icon, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-lg transition-colors
        ${isActive 
          ? 'text-primary bg-primary/5' 
          : 'text-primary/70 hover:text-primary hover:bg-primary/5'
        }`}
    >
      <Icon className="h-5 w-5" />
      <span className="ml-1 hidden sm:block">{children}</span>
    </Link>
  );
}