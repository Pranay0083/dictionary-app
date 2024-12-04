import React from 'react';
import { RefreshCw } from 'lucide-react';
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
  const percentage = (score / totalQuestions) * 100;
  const correctAnswers = totalQuestions - incorrectAnswers.length;
  const skippedAnswers = totalQuestions - (correctAnswers + incorrectAnswers.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Test Results
        </motion.h2>
        
        <div className="mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-4xl font-bold text-center mb-2"
          >
            {score}/{totalQuestions}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 text-center"
          >
            {percentage}% Correct
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span>Correct (+1):</span>
              <span className="text-green-600 font-medium">{correctAnswers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Incorrect (-1):</span>
              <span className="text-red-600 font-medium">{incorrectAnswers.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Skipped (0):</span>
              <span className="text-gray-600 font-medium">{skippedAnswers}</span>
            </div>
          </motion.div>
        </div>

        {incorrectAnswers.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold mb-4">Review Incorrect Answers:</h3>
            <div className="space-y-4">
              {incorrectAnswers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="border-l-4 border-red-500 pl-4 py-2"
                >
                  <div className="font-medium">{answer.term}</div>
                  <div className="text-sm text-gray-600">
                    <div className="mt-1">
                      <span className="text-red-500">Your answer:</span> {answer.userAnswer}
                    </div>
                    <div className="mt-1">
                      <span className="text-green-500">Correct answer:</span>{' '}
                      {answer.correctDefinition}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 
                   text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Try Another Test
        </motion.button>
      </div>
    </motion.div>
  );
}