import React from 'react';

interface IncorrectAnswerProps {
  term: string;
  userAnswer: string;
  correctDefinition: string;
}

export function IncorrectAnswer({ 
  term, 
  userAnswer, 
  correctDefinition 
}: IncorrectAnswerProps) {
  return (
    <div className="border-l-4 border-red-500 pl-4 py-2">
      <div className="font-medium">{term}</div>
      <div className="text-sm text-gray-600">
        <div className="mt-1">
          <span className="text-red-500">Your answer:</span> {userAnswer}
        </div>
        <div className="mt-1">
          <span className="text-green-500">Correct answer:</span>{' '}
          {correctDefinition}
        </div>
      </div>
    </div>
  );
}