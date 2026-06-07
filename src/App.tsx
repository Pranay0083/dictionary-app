import React, { useState, useEffect, useMemo } from 'react';
import { vocabularyWords } from './data/words';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Dictionary } from './components/Dictionary';
import { Analytics } from './components/Analytics';
import { Test } from './components/Test';
import { Results } from './components/Results';
import { LandingPage } from './components/LandingPage';
import { usePersistedState } from './hooks/usePersistedState';
import type { Word } from './types';
import type { TestAttempt } from './types/store';

export function App() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'dictionary' | 'analytics' | 'test'>('landing');
  
  // Persisted state
  const [customWords, setCustomWords] = usePersistedState<Word[]>('vocabflow-custom-words', []);
  const [deletedTerms, setDeletedTerms] = usePersistedState<string[]>('vocabflow-deleted-terms', []);
  const [attempts, setAttempts] = usePersistedState<TestAttempt[]>('vocabflow-test-attempts', []);
  const [theme, setTheme] = usePersistedState<'light' | 'dark'>('vocabflow-theme', 'light');
  
  // Dynamic test state
  const [testResult, setTestResult] = useState<{
    score: number;
    totalQuestions: number;
    incorrectAnswers: any[];
  } | null>(null);

  // Apply dark mode theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Combine default words list with custom words, filtering out deleted ones
  const allWords = useMemo(() => {
    const combined = [...vocabularyWords, ...customWords];
    const seen = new Set<string>();
    const unique: Word[] = [];
    
    customWords.forEach(w => {
      if (!seen.has(w.term.toLowerCase()) && !deletedTerms.includes(w.term)) {
        seen.add(w.term.toLowerCase());
        unique.push(w);
      }
    });

    vocabularyWords.forEach(w => {
      if (!seen.has(w.term.toLowerCase()) && !deletedTerms.includes(w.term)) {
        seen.add(w.term.toLowerCase());
        unique.push(w);
      }
    });

    return unique;
  }, [customWords, deletedTerms]);

  // Calculate study streak dynamically
  const streak = useMemo(() => {
    if (attempts.length === 0) return 0;
    
    const dateStrings = Array.from(
      new Set(attempts.map(a => a.date.split('T')[0]))
    ).sort();

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (!dateStrings.includes(todayStr) && !dateStrings.includes(yesterdayStr)) {
      return 0;
    }

    let currentStreak = 0;
    let checkDate = dateStrings.includes(todayStr) ? new Date() : yesterday;

    while (true) {
      const checkStr = checkDate.toISOString().split('T')[0];
      if (dateStrings.includes(checkStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return currentStreak;
  }, [attempts]);

  const handleAddWord = (newWord: Word) => {
    setCustomWords(prev => [newWord, ...prev]);
  };

  const handleDeleteWord = (term: string) => {
    if (customWords.some(w => w.term.toLowerCase() === term.toLowerCase())) {
      setCustomWords(prev => prev.filter(w => w.term.toLowerCase() !== term.toLowerCase()));
    } else {
      setDeletedTerms(prev => [...prev, term]);
    }
  };

  const handleTestComplete = (score: number, total: number, incorrect: any[]) => {
    const newAttempt: TestAttempt = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      score,
      totalQuestions: total,
      correctAnswersCount: total - incorrect.length,
      incorrectAnswersCount: incorrect.filter(i => i.userAnswer !== '').length,
      skippedAnswersCount: incorrect.filter(i => i.userAnswer === '').length,
      incorrectDetails: incorrect
    };
    
    setAttempts(prev => [...prev, newAttempt]);
    setTestResult({ score, totalQuestions: total, incorrectAnswers: incorrect });
  };

  const handleRetry = () => {
    setTestResult(null);
  };

  const handleResetData = () => {
    setCustomWords([]);
    setDeletedTerms([]);
    setAttempts([]);
    setTestResult(null);
    setView('dashboard');
  };

  const handleViewChange = (newView: typeof view) => {
    setView(newView);
    if (newView !== 'test') {
      setTestResult(null);
    }
  };

  const renderActiveView = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onEnterApp={() => handleViewChange('dashboard')} />;
      case 'dashboard':
        return (
          <Dashboard
            words={allWords}
            attempts={attempts}
            streak={streak}
            onStartTest={() => handleViewChange('test')}
            onViewDictionary={() => handleViewChange('dictionary')}
            onViewAnalytics={() => handleViewChange('analytics')}
          />
        );
      case 'dictionary':
        return (
          <Dictionary
            words={allWords}
            onAddWord={handleAddWord}
            onDeleteWord={handleDeleteWord}
          />
        );
      case 'analytics':
        return <Analytics attempts={attempts} words={allWords} />;
      case 'test':
        if (testResult) {
          return <Results {...testResult} onRetry={handleRetry} />;
        }
        return <Test words={allWords} onComplete={handleTestComplete} />;
      default:
        return null;
    }
  };

  const isNavigable = view !== 'landing';

  return (
    <div className="min-h-screen bg-[var(--color-bg-app)] text-[var(--color-text-primary)] transition-colors duration-300">
      {/* Navigation Sidebar Drawer (only rendered when in app) */}
      {isNavigable && (
        <Sidebar
          currentView={view as any}
          setView={handleViewChange}
          theme={theme}
          toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          onResetData={handleResetData}
          totalWordsLearned={allWords.length - vocabularyWords.length}
        />
      )}

      {/* Main Content Area */}
      <main className={`${isNavigable ? 'lg:pl-64 pt-20 lg:pt-8' : ''} min-h-screen pb-12 px-4 sm:px-8`}>
        <div className={isNavigable ? 'max-w-5xl mx-auto' : ''}>
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}
export default App;