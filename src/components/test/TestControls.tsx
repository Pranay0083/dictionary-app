import React from 'react';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

interface TestControlsProps {
  currentQuestion: number;
  isLastQuestion: boolean;
  selectedAnswer: string;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function TestControls({
  currentQuestion,
  isLastQuestion,
  selectedAnswer,
  onPrevious,
  onNext,
  onSkip,
}: TestControlsProps) {
  return (
    <div className="space-y-2 mt-6">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                   bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                   bg-indigo-600 text-white hover:bg-indigo-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onSkip}
        className="w-full flex items-center justify-center gap-2 py-2 px-4
                 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200
                 transition-colors"
      >
        <SkipForward className="w-4 h-4" />
        <span>Skip Question</span>
      </button>
    </div>
  );
}