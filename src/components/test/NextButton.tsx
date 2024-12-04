import React from 'react';

interface NextButtonProps {
  isLastQuestion: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function NextButton({ isLastQuestion, disabled, onClick }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg
               hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed
               transition-colors duration-200"
    >
      {isLastQuestion ? 'Finish Test' : 'Next Question'}
    </button>
  );
}