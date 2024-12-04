import React, { useState } from 'react';
import { vocabularyWords } from './data/words';
import { Test } from './components/Test';
import { Results } from './components/Results';
import { Dictionary } from './components/Dictionary';
import { HomePage } from './components/HomePage';
import type { TestResult } from './types';

export function App() {
  const [view, setView] = useState<'home' | 'test' | 'dictionary'>('home');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleTestComplete = (score: number, total: number, incorrect: any[]) => {
    setTestResult({ score, totalQuestions: total, incorrectAnswers: incorrect });
  };

  const handleRetry = () => {
    setTestResult(null);
    setView('home');
  };

  if (view === 'dictionary') {
    return (
      <Dictionary 
        words={vocabularyWords} 
        onBack={() => setView('home')} 
      />
    );
  }

  if (view === 'test') {
    if (testResult) {
      return <Results {...testResult} onRetry={handleRetry} />;
    }
    return <Test words={vocabularyWords} onComplete={handleTestComplete} />;
  }

  return (
    <HomePage
      onStartTest={() => setView('test')}
      onViewDictionary={() => setView('dictionary')}
    />
  );
}