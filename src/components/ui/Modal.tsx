import React from 'react';
import { X } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary/5 backdrop-blur-sm"
        onClick={onClose}
      />
      <GlassPanel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        <div className="flex justify-between items-center mb-4 p-4 border-b border-primary/10">
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary/5 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-primary/60" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </GlassPanel>
    </div>
  );
}