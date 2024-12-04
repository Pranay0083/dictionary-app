import React from 'react';
import { Check, X, MinusCircle } from 'lucide-react';

interface ScoreFeedbackProps {
  isCorrect: boolean;
  skipped: boolean;
}

export function ScoreFeedback({ isCorrect, skipped }: ScoreFeedbackProps) {
  if (skipped) {
    return (
      <div className="flex items-center justify-center mt-4 text-gray-600">
        <MinusCircle className="w-6 h-6 mr-2" />
        <span className="text-lg font-medium">0 (Skipped)</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center mt-4 ${
      isCorrect ? 'text-green-600' : 'text-red-600'
    }`}>
      {isCorrect ? (
        <Check className="w-6 h-6 mr-2" />
      ) : (
        <X className="w-6 h-6 mr-2" />
      )}
      <span className="text-lg font-medium">
        {isCorrect ? '+1' : '-1'}
      </span>
    </div>
  );
}