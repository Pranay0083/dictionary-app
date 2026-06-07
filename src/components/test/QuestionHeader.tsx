import React from 'react';
import { motion } from 'framer-motion';

interface QuestionHeaderProps {
  currentQuestion: number;
  term: string;
}

export function QuestionHeader({ currentQuestion, term }: QuestionHeaderProps) {
  const progress = ((currentQuestion + 1) / 10) * 100;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <motion.span
            key={`progress-${currentQuestion}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--color-text-tertiary)]"
          >
            Question {currentQuestion + 1} of 10
          </motion.span>
          <span className="text-[var(--color-accent)]">
            {progress}% Complete
          </span>
        </div>
        
        {/* Progress Bar container */}
        <div className="w-full bg-[var(--color-secondary-bg)] rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-[var(--color-accent)] h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <motion.div
        key={`question-${currentQuestion}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="pt-2"
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)] leading-tight">
          What is the definition of <span className="text-[var(--color-accent)]">"{term}"</span>?
        </h2>
      </motion.div>
    </div>
  );
}