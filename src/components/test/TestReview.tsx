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
    if (skipped) return <MinusCircle className="w-6 h-6 text-gray-500" />;
    return isCorrect ? (
      <Check className="w-6 h-6 text-green-500" />
    ) : (
      <X className="w-6 h-6 text-red-500" />
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto p-4 sm:p-6"
    >
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Review Your Answers
        </motion.h2>
        
        <div className="space-y-4 sm:space-y-6">
          {testWords.map((word, index) => {
            const userAnswer = userAnswers[index];
            const isSkipped = userAnswer === '';
            const isCorrect = userAnswer === word.definition;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  isSkipped
                    ? 'border-gray-200 bg-gray-50'
                    : isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Question {index + 1}</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {getScoreIcon(isCorrect, isSkipped)}
                  </motion.div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {word.term}
                </h3>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {!isSkipped && (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <span className="text-gray-600 min-w-[100px]">Your answer:</span>
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {userAnswer}
                      </span>
                    </div>
                  )}
                  
                  {(isSkipped || !isCorrect) && (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <span className="text-gray-600 min-w-[100px]">Correct answer:</span>
                      <span className="text-green-600">{word.definition}</span>
                    </div>
                  )}

                  {isSkipped && (
                    <div className="text-gray-500 italic mt-2">Question skipped</div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 
                   text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span>See Final Score</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}