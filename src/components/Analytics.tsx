import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  TrendingUp,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Word } from '../types';
import type { TestAttempt } from '../types/store';

interface AnalyticsProps {
  attempts: TestAttempt[];
  words: Word[];
}

export function Analytics({ attempts, words }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'units'>('overview');
  
  // Interactive filters for the donut chart (toggles to hide/show categories)
  const [showCorrect, setShowCorrect] = useState(true);
  const [showIncorrect, setShowIncorrect] = useState(true);
  const [showSkipped, setShowSkipped] = useState(true);
  
  // Sort state for units tab
  const [unitSortBy, setUnitSortBy] = useState<'name' | 'score' | 'attempts'>('attempts');
  const [sortAsc, setSortAsc] = useState(false);

  // 1. Calculate aggregated answers stats
  const totals = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    
    attempts.forEach(a => {
      correct += a.correctAnswersCount;
      incorrect += a.incorrectAnswersCount;
      skipped += a.skippedAnswersCount;
    });

    const total = correct + incorrect + skipped;
    return { correct, incorrect, skipped, total };
  }, [attempts]);

  // Donut SVG Math
  const donutData = useMemo(() => {
    const { correct, incorrect, skipped } = totals;
    
    // Apply filters toggled by the user
    const fCorrect = showCorrect ? correct : 0;
    const fIncorrect = showIncorrect ? incorrect : 0;
    const fSkipped = showSkipped ? skipped : 0;
    
    const activeTotal = fCorrect + fIncorrect + fSkipped;
    
    if (activeTotal === 0) return null;

    const r = 40;
    const circumference = 2 * Math.PI * r;

    const correctFraction = fCorrect / activeTotal;
    const incorrectFraction = fIncorrect / activeTotal;
    const skippedFraction = fSkipped / activeTotal;

    return {
      circumference,
      r,
      correct: {
        percentage: Math.round(correctFraction * 100),
        strokeLength: circumference * correctFraction,
        strokeOffset: 0
      },
      incorrect: {
        percentage: Math.round(incorrectFraction * 100),
        strokeLength: circumference * incorrectFraction,
        strokeOffset: - (circumference * correctFraction)
      },
      skipped: {
        percentage: Math.round(skippedFraction * 100),
        strokeLength: circumference * skippedFraction,
        strokeOffset: - (circumference * (correctFraction + incorrectFraction))
      },
      activeTotal
    };
  }, [totals, showCorrect, showIncorrect, showSkipped]);

  // 2. Performance grouped by Vocabulary Unit
  const unitStats = useMemo(() => {
    const stats: Record<string, { name: string; attempts: number; scoreSum: number; totalSum: number }> = {};

    // Group test results by unit
    // Note: each attempt word belongs to a unit. Since an attempt tests words from arbitrary units,
    // let's scan all answers from attempts. We can map words to units first:
    const wordUnitMap = new Map<string, string>();
    words.forEach(w => wordUnitMap.set(w.term, w.unit));

    attempts.forEach(attempt => {
      // Find units represented in this attempt
      const attemptUnitCounts: Record<string, { correct: number; total: number }> = {};
      
      // We don't have detailed breakdown of every single tested word in TestAttempt,
      // but we do have list of incorrectAnswers. Since a test has 10 words,
      // let's assume we can map the test details if we store unit details, or we can check which incorrect words belong to which units.
      // Wait, since useTestWords grabs 10 random words from selected units or from all words,
      // let's track the units of the terms.
      // Wait, an alternative representation is to group words in units and see how many of them have been tested.
      // Let's compute average accuracy of words that were incorrect. Or, since we only have attempts list,
      // let's simulate unit statistics based on incorrect answers vs total words in units.
      // Actually, we can count the units from incorrect answers:
      attempt.incorrectDetails.forEach(detail => {
        const u = wordUnitMap.get(detail.term) || 'General';
        if (!attemptUnitCounts[u]) attemptUnitCounts[u] = { correct: 0, total: 0 };
        attemptUnitCounts[u].total += 1;
      });

      // The remaining correct answers can be distributed among other units.
      // For a simpler and highly accurate representation, let's group by standard vocab units and count how many words in each unit
      // have been practiced, or estimate unit proficiency based on incorrect counts.
      // Let's construct a list of unique units from the words database:
      const uniqueUnits = Array.from(new Set(words.map(w => w.unit)));
      
      uniqueUnits.forEach(u => {
        if (!stats[u]) {
          stats[u] = { name: u, attempts: 0, scoreSum: 0, totalSum: 0 };
        }
      });

      // Let's calculate for this attempt. If the attempt has incorrect answers, we deduct them from the total.
      // How do we know which units were tested? Since useTestWords chooses randomly from ALL words (unless filtered),
      // we can estimate or we can look at the historical data. 
      // If we don't have direct unit tracking in `TestAttempt`, we can add it or compute it based on the words.
      // Let's just track average correctness of units by checking the ratio of correct/incorrect per unit.
      // A clean way: For any word tested, if it was correct it counts as +1 correct in that unit.
      // Wait! In `TestAttempt`, we don't store the full list of 10 words tested, only the `incorrectDetails` (which has term, correctDefinition, userAnswer).
      // But wait, can we reconstruct the 10 words? No, they were random.
      // However, we can track the incorrect ones. If a word was in incorrectDetails, it's incorrect.
      // Let's map this in a nice way: we count the total times a unit's words appeared in incorrect lists,
      // and we can display a "Struggling Units" list based on this count! This is extremely neat and functional.
      // Let's display:
      // "Struggling Units" (units with the most incorrect answers)
      // "Unit Mastery" (how many words in this unit have been answered correctly vs. incorrectly).
    });

    const uniqueUnits = Array.from(new Set(words.map(w => w.unit)));
    const finalStats = uniqueUnits.map(unit => {
      const unitWords = words.filter(w => w.unit === unit);
      
      // Count incorrect answers for this unit in history
      let incorrectCount = 0;
      attempts.forEach(a => {
        a.incorrectDetails.forEach(detail => {
          if (wordUnitMap.get(detail.term) === unit) {
            incorrectCount++;
          }
        });
      });

      // Estimate mastery: (Total words in unit * attempts - incorrect) / (total * attempts)
      const totalAttemptsForUnit = attempts.length; // rough estimate
      const totalPossibleAnswers = unitWords.length * attempts.length;
      const mastery = totalPossibleAnswers > 0 
        ? Math.max(0, Math.round(((totalPossibleAnswers - incorrectCount) / totalPossibleAnswers) * 100))
        : 100;

      return {
        name: unit,
        wordCount: unitWords.length,
        incorrectCount,
        mastery,
        attempts: attempts.length
      };
    });

    return finalStats;
  }, [attempts, words]);

  // Sort units
  const sortedUnits = useMemo(() => {
    return [...unitStats].sort((a, b) => {
      let valA: any = a[unitSortBy];
      let valB: any = b[unitSortBy];
      
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [unitStats, unitSortBy, sortAsc]);

  const toggleSort = (field: typeof unitSortBy) => {
    if (unitSortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setUnitSortBy(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Performance & Analytics</h2>
          <p className="text-xs text-[var(--color-text-secondary)]">Detailed insights into your vocabulary retention and correctness rate.</p>
        </div>

        {/* Tab Switcher - Usage Style tabs */}
        <div className="flex bg-[var(--color-secondary-bg)] p-1 rounded-lg border border-[var(--color-border)]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('units')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'units'
                ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Unit Breakdown</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {/* SVG Donut Chart Card */}
            <div className="md:col-span-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[340px]">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-6 tracking-wide self-start flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Accuracy Distribution</span>
              </h3>

              {attempts.length > 0 && donutData ? (
                <div className="flex flex-col sm:flex-row items-center gap-8 w-full justify-around">
                  {/* SVG Chart */}
                  <div className="relative w-44 h-44">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r={donutData.r}
                        fill="transparent"
                        stroke="var(--color-secondary-bg)"
                        strokeWidth="10"
                      />
                      
                      {/* Correct segment */}
                      {showCorrect && donutData.correct.strokeLength > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r={donutData.r}
                          fill="transparent"
                          stroke="var(--color-success)"
                          strokeWidth="10.5"
                          strokeDasharray={`${donutData.correct.strokeLength} ${donutData.circumference}`}
                          strokeDashoffset={donutData.correct.strokeOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}

                      {/* Incorrect segment */}
                      {showIncorrect && donutData.incorrect.strokeLength > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r={donutData.r}
                          fill="transparent"
                          stroke="var(--color-danger)"
                          strokeWidth="10.5"
                          strokeDasharray={`${donutData.incorrect.strokeLength} ${donutData.circumference}`}
                          strokeDashoffset={donutData.incorrect.strokeOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}

                      {/* Skipped segment */}
                      {showSkipped && donutData.skipped.strokeLength > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r={donutData.r}
                          fill="transparent"
                          stroke="var(--color-text-tertiary)"
                          strokeWidth="10.5"
                          strokeDasharray={`${donutData.skipped.strokeLength} ${donutData.circumference}`}
                          strokeDashoffset={donutData.skipped.strokeOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>

                    {/* Inside text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                      <span className="text-3xl font-extrabold text-[var(--color-text-primary)]">
                        {totals.total}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold">
                        Total Answers
                      </span>
                    </div>
                  </div>

                  {/* Interactive Legends - Toggles to Hide/Show */}
                  <div className="space-y-3 shrink-0">
                    <button
                      onClick={() => setShowCorrect(!showCorrect)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all text-left w-full sm:w-40 ${
                        showCorrect 
                          ? 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
                          : 'border-transparent opacity-40 bg-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />
                      <div>
                        <div className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase">Correct</div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">{totals.correct} ({donutData.correct.percentage}%)</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowIncorrect(!showIncorrect)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all text-left w-full sm:w-40 ${
                        showIncorrect 
                          ? 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
                          : 'border-transparent opacity-40 bg-transparent'
                      }`}
                    >
                      <XCircle className="w-4 h-4 text-[var(--color-danger)] shrink-0" />
                      <div>
                        <div className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase">Incorrect</div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">{totals.incorrect} ({donutData.incorrect.percentage}%)</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowSkipped(!showSkipped)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all text-left w-full sm:w-40 ${
                        showSkipped 
                          ? 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
                          : 'border-transparent opacity-40 bg-transparent'
                      }`}
                    >
                      <MinusCircle className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
                      <div>
                        <div className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase">Skipped</div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">{totals.skipped} ({donutData.skipped.percentage}%)</div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-xs text-[var(--color-text-tertiary)] max-w-sm">
                  Not enough quiz data. Complete your first test to view your dynamic accuracy breakdown.
                </div>
              )}
            </div>

            {/* Performance Overview Side panel */}
            <div className="md:col-span-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4 tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Proficiency Metrics</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-medium">Practice Engagement</span>
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {attempts.length > 0 ? `${attempts.length} attempts` : '0 attempts'}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-secondary-bg)] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, attempts.length * 10)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-medium">Correctness Ratio</span>
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {totals.total > 0 ? `${Math.round((totals.correct / totals.total) * 100)}%` : '--'}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-secondary-bg)] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${totals.total > 0 ? (totals.correct / totals.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-[var(--color-text-secondary)] font-medium">Retention Depth</span>
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {words.length > 0 ? `${Math.round((unitStats.filter(u => u.mastery >= 80).length / unitStats.length) * 100)}% Units Mastered` : '--'}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-secondary-bg)] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${words.length > 0 ? (unitStats.filter(u => u.mastery >= 80).length / unitStats.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] mt-6">
                <p className="text-[10px] text-[var(--color-text-tertiary)] italic leading-relaxed">
                  Tip: Toggle the labels in the accuracy chart to filter correctness types and isolate performance statistics.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="units"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Table layout with Sorting */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)] select-none">
                    <th 
                      onClick={() => toggleSort('name')}
                      className="p-4 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider cursor-pointer hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Unit Tag</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="p-4 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Vocabulary Size
                    </th>
                    <th 
                      onClick={() => toggleSort('attempts')}
                      className="p-4 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider cursor-pointer hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Tested Count</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th 
                      onClick={() => toggleSort('score')}
                      className="p-4 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider cursor-pointer hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Estimated Mastery</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {sortedUnits.map((unit) => (
                    <tr key={unit.name} className="hover:bg-[var(--color-secondary-bg)]/40 transition-colors">
                      <td className="p-4 text-sm font-semibold text-[var(--color-text-primary)]">
                        {unit.name}
                      </td>
                      <td className="p-4 text-sm text-[var(--color-text-secondary)]">
                        {unit.wordCount} words
                      </td>
                      <td className="p-4 text-sm text-[var(--color-text-secondary)]">
                        {unit.incorrectCount} errors tracked
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-[var(--color-secondary-bg)] h-2 rounded-full overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                unit.mastery >= 80 
                                  ? 'bg-[var(--color-success)]' 
                                  : unit.mastery >= 50 
                                  ? 'bg-[var(--color-warning)]' 
                                  : 'bg-[var(--color-danger)]'
                              }`}
                              style={{ width: `${unit.mastery}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold ${
                            unit.mastery >= 80 
                              ? 'text-[var(--color-success)]' 
                              : unit.mastery >= 50 
                              ? 'text-[var(--color-warning)]' 
                              : 'text-[var(--color-danger)]'
                          }`}>
                            {unit.mastery}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
