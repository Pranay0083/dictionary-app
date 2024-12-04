import React from 'react';
import { SkipForward } from 'lucide-react';

interface SkipButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SkipButton({ onClick, disabled }: SkipButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-100 
               text-gray-600 py-2 px-6 rounded-lg hover:bg-gray-200 
               transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <SkipForward className="w-4 h-4" />
      Skip Question
    </button>
  );
}