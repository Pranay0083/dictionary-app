import React, { useState } from 'react';
import type { Word } from '../types';
import { useTestWords } from '../hooks/useTestWords';
import { useAnswers } from '../hooks/useAnswers';
import { QuestionHeader } from './test/QuestionHeader';
import { AnswerOptions } from './test/AnswerOptions';
import { TestControls } from './test/TestControls';
import { TestReview } from './test/TestReview';

interface TestProps {
  words: Word[];
  onComplete: (score: number, total: number, incorrect: any[]) => void;
}

export function Test({ words, onComplete }: TestProps) {
  const testWords = useTestWords(words);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(10).fill(''));
  const [isReviewing, setIsReviewing] = useState(false);
  
  const answers = useAnswers(currentQuestion, testWords, words);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === 9) {
      setIsReviewing(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSkip = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = '';
    setSelectedAnswers(newAnswers);
    handleNext();
  };

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleReviewComplete = () => {
    const score = selectedAnswers.reduce((acc, curr, idx) => {
      if (curr === '') return acc;
      return curr === testWords[idx].definition ? acc + 1 : acc - 1;
    }, 0);

    const incorrect = testWords
      .map((word, idx) => ({
        term: word.term,
        correctDefinition: word.definition,
        userAnswer: selectedAnswers[idx],
      }))
      .filter((item) => item.userAnswer !== '' && item.correctDefinition !== item.userAnswer);

    onComplete(score, 10, incorrect);
  };

  if (testWords.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-lg text-gray-700">
            Not enough words available for a test. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (isReviewing) {
    return (
      <TestReview
        testWords={testWords}
        userAnswers={selectedAnswers}
        onComplete={handleReviewComplete}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <QuestionHeader 
          currentQuestion={currentQuestion} 
          term={testWords[currentQuestion].term} 
        />
        <AnswerOptions
          answers={answers}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
          disabled={false}
        />
        <TestControls
          currentQuestion={currentQuestion}
          isLastQuestion={currentQuestion === 9}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}