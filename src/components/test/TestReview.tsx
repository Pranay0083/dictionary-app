import React from 'react';
import { Check, X, MinusCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Word } from '../../types';

interface TestReviewProps {
  testWords: Word[];
  userAnswers: string[];
  onComplete: () => void;
}

export function TestReview({ testWords, userAnswers, onComplete }: TestReviewProps) {
  const getScoreIcon = (isCorrect: boolean, skipped: boolean) => {
    if (skipped) return <MinusCircle className="w-5 h-5 text-[var(--color-text-tertiary)]" />;
    return isCorrect ? (
      <Check className="w-5 h-5 text-[var(--color-success)]" />
    ) : (
      <X className="w-5 h-5 text-[var(--color-danger)]" />
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
        <div className="border-b border-[var(--color-border)] pb-4 mb-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Review Your Answers
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Double-check your choices before submitting the final score.
          </p>
        </div>
        
        <div className="space-y-4">
          {testWords.map((word, index) => {
            const userAnswer = userAnswers[index];
            const isSkipped = userAnswer === '';
            const isCorrect = userAnswer === word.definition;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-colors ${
                  isSkipped
                    ? 'border-[var(--color-border)] bg-[var(--color-secondary-bg)]/40'
                    : isCorrect
                    ? 'border-[var(--color-success)]/20 bg-[var(--color-success-bg)]/30 text-[var(--color-text-primary)]'
                    : 'border-[var(--color-danger)]/20 bg-[var(--color-danger-bg)]/30 text-[var(--color-text-primary)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-[var(--color-text-tertiary)] tracking-wider">
                    Question {index + 1}
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    {getScoreIcon(isCorrect, isSkipped)}
                    <span className={isSkipped ? 'text-[var(--color-text-secondary)]' : isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}>
                      {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2">
                  {word.term}
                </h3>
                
                <div className="space-y-1 text-xs">
                  {!isSkipped && (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                      <span className="text-[var(--color-text-secondary)] min-w-[100px] font-semibold">Your choice:</span>
                      <span className={isCorrect ? 'text-[var(--color-success)] font-medium' : 'text-[var(--color-danger)] font-medium'}>
                        {userAnswer}
                      </span>
                    </div>
                  )}
                  
                  {(isSkipped || !isCorrect) && (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                      <span className="text-[var(--color-text-secondary)] min-w-[100px] font-semibold">Definition:</span>
                      <span className="text-[var(--color-success)] font-medium">{word.definition}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={onComplete}
          className="mt-6 w-full btn-accent py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm"
        >
          <span>Calculate Final Score</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}