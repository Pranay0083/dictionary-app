import React from 'react';
import { RefreshCw, CheckCircle2, XCircle, MinusCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TestResult } from '../types';

interface ResultsProps extends TestResult {
  onRetry: () => void;
}

export function Results({ 
  score, 
  totalQuestions, 
  incorrectAnswers, 
  onRetry 
}: ResultsProps) {
  const correctCount = totalQuestions - incorrectAnswers.length;
  const incorrectCount = incorrectAnswers.filter(a => a.userAnswer !== '').length;
  const skippedCount = totalQuestions - correctCount - incorrectCount;
  
  // Custom score calculation matching implementation: correct (+1), incorrect (-1), skipped (0)
  const percentCorrect = Math.max(0, Math.round((correctCount / totalQuestions) * 100));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-[var(--color-border)] pb-6">
          <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-[var(--color-accent)] font-semibold text-xs rounded-full uppercase tracking-wider">
            Quiz Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
            Your Performance Report
          </h2>
        </div>

        {/* Score Ring / Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Big Score Visual */}
          <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-secondary-bg)]/40 border border-[var(--color-border)] rounded-xl relative overflow-hidden">
            <div className="text-5xl font-extrabold text-[var(--color-text-primary)] select-none">
              {score}
            </div>
            <div className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mt-1.5">
              Net Score
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)] mt-1">
              {percentCorrect}% Correct ({correctCount}/{totalQuestions} questions)
            </div>
          </div>

          {/* Correct/Incorrect breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--color-border)] text-xs">
              <div className="flex items-center gap-2 font-semibold text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
                <span>Correct (+1)</span>
              </div>
              <span className="font-bold text-[var(--color-success)]">{correctCount}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--color-border)] text-xs">
              <div className="flex items-center gap-2 font-semibold text-[var(--color-text-secondary)]">
                <XCircle className="w-4 h-4 text-[var(--color-danger)]" />
                <span>Incorrect (-1)</span>
              </div>
              <span className="font-bold text-[var(--color-danger)]">{incorrectCount}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--color-border)] text-xs">
              <div className="flex items-center gap-2 font-semibold text-[var(--color-text-secondary)]">
                <MinusCircle className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                <span>Skipped (0)</span>
              </div>
              <span className="font-bold text-[var(--color-text-primary)]">{skippedCount}</span>
            </div>
          </div>
        </div>

        {/* List Incorrect Answers for study review */}
        {incorrectAnswers.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[var(--color-danger)]" />
              <span>Review Mistaken Words</span>
            </h3>
            
            <div className="space-y-2.5">
              {incorrectAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-[var(--color-danger)]/15 bg-[var(--color-danger-bg)]/20 text-xs space-y-1.5"
                >
                  <div className="font-bold text-[var(--color-text-primary)] text-sm">{answer.term}</div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-1">
                      <span className="text-[var(--color-text-tertiary)] min-w-[70px] font-medium">Your answer:</span>
                      <span className="text-[var(--color-danger)] font-semibold">{answer.userAnswer || 'None (Skipped)'}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-[var(--color-text-tertiary)] min-w-[70px] font-medium">Correct:</span>
                      <span className="text-[var(--color-success)] font-semibold">{answer.correctDefinition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="w-full btn-accent py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-lg hover:shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4 animate-spin-hover" />
          <span>Try Another Practice Test</span>
        </button>
      </div>
    </motion.div>
  );
}