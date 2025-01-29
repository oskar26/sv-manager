import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
}

export function GlassPanel({ 
  children, 
  className = '', 
  blur = 'md' 
}: GlassPanelProps) {
  const blurClass = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  }[blur];

  return (
    <div className={`
      bg-white/70 ${blurClass}
      border border-white/20
      shadow-glass
      rounded-2xl
      ${className}
    `}>
      {children}
    </div>
  );
}