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
    <div className="space-y-3 mt-6">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="btn-accent flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
        >
          <span>{isLastQuestion ? 'Review Answers' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onSkip}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold bg-transparent text-[var(--color-text-secondary)] border border-dashed border-[var(--color-border)] rounded-xl hover:bg-[var(--color-secondary-bg)] hover:text-[var(--color-text-primary)] transition-all"
      >
        <SkipForward className="w-3.5 h-3.5" />
        <span>Skip Question</span>
      </button>
    </div>
  );
}