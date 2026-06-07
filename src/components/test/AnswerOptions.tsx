import React from 'react';
import { motion } from 'framer-motion';

interface AnswerOptionsProps {
  answers: string[];
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
  disabled: boolean;
}

export function AnswerOptions({ 
  answers, 
  selectedAnswer, 
  onSelectAnswer,
  disabled 
}: AnswerOptionsProps) {
  if (!answers.length) {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full h-14 bg-[var(--color-secondary-bg)] rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {answers.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        return (
          <motion.button
            key={`${answer}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: disabled ? 1 : 1.01 }}
            whileTap={{ scale: disabled ? 1 : 0.99 }}
            onClick={() => onSelectAnswer(answer)}
            disabled={disabled}
            className={`w-full p-4 text-left rounded-xl border text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 ${
              isSelected
                ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-text-primary)] ring-2 ring-[var(--color-accent)]/15'
                : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary-bg)]/30'
            } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold transition-colors ${
                isSelected 
                  ? 'bg-[var(--color-accent)] text-white border-transparent' 
                  : 'bg-[var(--color-secondary-bg)] border-[var(--color-border)] text-[var(--color-text-tertiary)]'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 leading-normal">{answer}</span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}