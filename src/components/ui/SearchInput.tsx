import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
}

export function SearchInput({ onSearch, className = '', ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
      <input
        type="text"
        className={`
          glass-input pl-10
          ${className}
        `}
        onChange={(e) => onSearch(e.target.value)}
        {...props}
      />
    </div>
  );
}