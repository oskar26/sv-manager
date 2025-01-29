import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}