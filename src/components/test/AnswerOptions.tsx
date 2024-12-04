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
      <div className="animate-pulse space-y-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full h-16 bg-gray-100 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {answers.map((answer, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectAnswer(answer)}
          disabled={disabled}
          className={`w-full p-4 text-left rounded-lg border transform transition-all duration-200 ${
            selectedAnswer === answer
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
              : 'border-gray-200 hover:border-indigo-300'
          } ${disabled ? 'cursor-not-allowed opacity-75' : ''}`}
        >
          {answer}
        </motion.button>
      ))}
    </motion.div>
  );
}