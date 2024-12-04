import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NavigationProps {
  onBack: () => void;
  label?: string;
}

export function Navigation({ onBack, label = 'Back to Home' }: NavigationProps) {
  return (
    <button
      onClick={onBack}
      className="fixed top-4 left-4 px-4 py-2 bg-indigo-600 text-white rounded-lg 
                hover:bg-indigo-700 transition-colors flex items-center gap-2
                shadow-md hover:shadow-lg z-10"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}