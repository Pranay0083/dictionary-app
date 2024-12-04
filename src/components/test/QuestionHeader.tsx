import React from 'react';
import { motion } from 'framer-motion';

interface QuestionHeaderProps {
  currentQuestion: number;
  term: string;
}

export function QuestionHeader({ currentQuestion, term }: QuestionHeaderProps) {
  const progress = ((currentQuestion + 1) / 10) * 100;

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <motion.span
            key={`progress-${currentQuestion}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-gray-500"
          >
            Question {currentQuestion + 1} of 10
          </motion.span>
          <span className="text-sm font-medium text-indigo-600">
            {progress}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-indigo-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.div
        key={`question-${currentQuestion}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          What is the definition of <span className="text-indigo-600">"{term}"</span>?
        </h2>
      </motion.div>
    </div>
  );
}