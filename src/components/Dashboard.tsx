import React, { useMemo } from 'react';
import { 
  Trophy, 
  Flame, 
  BookMarked,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Word } from '../types';
import type { TestAttempt } from '../types/store';

interface DashboardProps {
  words: Word[];
  attempts: TestAttempt[];
  streak: number;
  onStartTest: () => void;
  onViewDictionary: () => void;
  onViewAnalytics: () => void;
}

export function Dashboard({
  words,
  attempts,
  streak,
  onStartTest,
  onViewDictionary,
  onViewAnalytics
}: DashboardProps) {
  
  // Calculate average score
  const avgScore = useMemo(() => {
    if (attempts.length === 0) return 0;
    const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
    const totalQuestions = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    return Math.round((totalScore / totalQuestions) * 100);
  }, [attempts]);

  // Determine Word of the Day (seeded by current date index)
  const wordOfTheDay = useMemo(() => {
    if (words.length === 0) return null;
    const day = new Date().getDate();
    const index = day % words.length;
    return words[index];
  }, [words]);

  // Generate sparkline coordinates for recent tests (up to 5)
  const sparklinePoints = useMemo(() => {
    if (attempts.length === 0) return '';
    const recent = [...attempts].slice(-5);
    const width = 240;
    const height = 60;
    const padding = 5;
    
    if (recent.length === 1) {
      const y = height - (recent[0].score / recent[0].totalQuestions) * height;
      return `M 0 ${y} L ${width} ${y}`;
    }

    const stepX = width / (recent.length - 1);
    return recent
      .map((attempt, idx) => {
        const x = idx * stepX;
        // Map score percentage to height (y is inverted in SVG)
        const pct = attempt.score / attempt.totalQuestions;
        // Keep inside bounds
        const y = height - padding - (pct * (height - padding * 2));
        const prefix = idx === 0 ? 'M' : 'L';
        return `${prefix} ${x} ${y}`;
      })
      .join(' ');
  }, [attempts]);

  const recentAttempts = useMemo(() => {
    return [...attempts].reverse().slice(0, 3);
  }, [attempts]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Welcome Banner Card */}
      <div className="bg-[var(--color-secondary-bg)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] leading-tight">
            Elevate Your Vocabulary Today
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-md">
            Review definitions, check your progress metrics, and challenge yourself with interactive quizzes.
          </p>
        </div>
        <button
          onClick={onStartTest}
          className="btn-accent px-5 py-3 rounded-xl flex items-center gap-2 font-semibold text-sm whitespace-nowrap"
        >
          <span>Start Practice Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main KPI Stats Grid - No Redundant metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Streak Card */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold">Active Streak</span>
            <div className="text-3xl font-bold text-[var(--color-text-primary)] flex items-baseline gap-1">
              <span>{streak}</span>
              <span className="text-sm text-[var(--color-text-secondary)] font-normal">days</span>
            </div>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-lg">
            <Flame className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Mastered Words Card */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold">Total Library</span>
            <div className="text-3xl font-bold text-[var(--color-text-primary)] flex items-baseline gap-1">
              <span>{words.length}</span>
              <span className="text-sm text-[var(--color-text-secondary)] font-normal">words</span>
            </div>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-[var(--color-accent)] rounded-lg">
            <BookMarked className="w-6 h-6" />
          </div>
        </div>

        {/* Success Score Card */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold">Accuracy</span>
            <div className="text-3xl font-bold text-[var(--color-text-primary)] flex items-baseline gap-1">
              <span>{attempts.length > 0 ? avgScore : '--'}</span>
              <span className="text-sm text-[var(--color-text-secondary)] font-normal">%</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-lg">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Word of the Day - Premium Skewed Accent Card for Visual Interest */}
        {wordOfTheDay && (
          <div className="lg:col-span-3 flex flex-col justify-stretch">
            <div className="h-full transform hover:scale-[1.01] hover:-rotate-0.5 transition-all duration-300 bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-accent)]/10 transition-colors duration-300" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-[var(--color-accent-light)] text-[var(--color-accent)] font-semibold text-xs rounded-full uppercase tracking-wider">
                    Word of the Day
                  </span>
                  <span className="text-xs text-[var(--color-text-tertiary)] font-semibold">
                    {wordOfTheDay.unit}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2">
                  {wordOfTheDay.term}
                </h3>
                
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {wordOfTheDay.definition}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onViewDictionary}
                  className="btn-secondary px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  Explore Dictionary
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Micro-Chart Card - Trends & Activities */}
        <div className="lg:col-span-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Recent Trend</span>
              </h4>
              <button 
                onClick={onViewAnalytics}
                className="text-xs text-[var(--color-accent)] font-semibold hover:underline"
              >
                Full Analytics
              </button>
            </div>

            {/* Sparkline Graph */}
            <div className="h-24 flex items-center justify-center bg-[var(--color-secondary-bg)] rounded-lg p-4 relative overflow-hidden">
              {attempts.length > 0 ? (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="240" y2="10" stroke="var(--color-border)" strokeDasharray="3 3" />
                  <line x1="0" y1="30" x2="240" y2="30" stroke="var(--color-border)" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="240" y2="50" stroke="var(--color-border)" strokeDasharray="3 3" />
                  
                  {/* Glowing line path */}
                  <path
                    d={sparklinePoints}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <div className="text-center text-xs text-[var(--color-text-tertiary)] px-4">
                  No quizzes completed yet. Your performance curve will be visualised here.
                </div>
              )}
            </div>
          </div>

          {/* Quick Attempts History */}
          <div className="mt-4 space-y-2">
            <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold block">
              Last Quizzes
            </span>
            {recentAttempts.length > 0 ? (
              <div className="space-y-1.5">
                {recentAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex justify-between items-center text-xs">
                    <span className="text-[var(--color-text-secondary)] font-medium">
                      {new Date(attempt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {attempt.score}/{attempt.totalQuestions} ({Math.round((attempt.score/attempt.totalQuestions)*100)}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs italic text-[var(--color-text-tertiary)]">No recent history.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
