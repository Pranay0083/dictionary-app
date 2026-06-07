import React from 'react';
import { 
  Compass, 
  ArrowRight, 
  Trophy, 
  BookMarked, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  XCircle,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-app)] text-[var(--color-text-primary)] relative overflow-hidden select-none">
      
      {/* Dynamic Background Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute top-[40%] -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      
      {/* Header / Navbar */}
      <header className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-lg">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[var(--color-text-primary)]">VocabFlow</span>
        </div>
        
        <button
          onClick={onEnterApp}
          className="btn-secondary px-4 py-2 rounded-lg text-xs font-semibold"
        >
          Enter Studio
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headings & CTA */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Vocabulary Learning</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-none"
          >
            Master Your Vocabulary with <span className="text-[var(--color-accent)]">Precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg"
          >
            A premium study space built for serious students. Track retention metrics, complete adaptive quizzes, and manage custom vocabulary libraries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={onEnterApp}
              className="btn-accent px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Premium Skewed CSS Application Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 transform hover:rotate-0 hover:scale-[1.01] transition-all duration-500 origin-center select-none"
        >
          {/* Simulated App Screen (Glassmorphism & Depth) */}
          <div className="w-full max-w-lg mx-auto bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-5 space-y-4 relative overflow-hidden">
            {/* Header control dots */}
            <div className="flex items-center gap-1.5 pb-2 border-b border-[var(--color-border)]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono ml-2">VocabFlow - Analytics Studio</span>
            </div>

            {/* Layout simulation */}
            <div className="grid grid-cols-3 gap-3">
              {/* Mini KPI */}
              <div className="p-3 bg-[var(--color-secondary-bg)] border border-[var(--color-border)] rounded-lg space-y-1">
                <span className="text-[8px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider block">Streak</span>
                <span className="text-sm font-extrabold text-[var(--color-text-primary)] flex items-center gap-1">
                  <span>12</span>
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                </span>
              </div>
              <div className="p-3 bg-[var(--color-secondary-bg)] border border-[var(--color-border)] rounded-lg space-y-1">
                <span className="text-[8px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider block">Mastered</span>
                <span className="text-sm font-extrabold text-[var(--color-text-primary)] flex items-center gap-1">
                  <span>145</span>
                  <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
                </span>
              </div>
              <div className="p-3 bg-[var(--color-secondary-bg)] border border-[var(--color-border)] rounded-lg space-y-1">
                <span className="text-[8px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider block">Accuracy</span>
                <span className="text-sm font-extrabold text-[var(--color-text-primary)] flex items-center gap-1">
                  <span>92%</span>
                  <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                </span>
              </div>
            </div>

            {/* Simulated Donut Chart */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 rounded-xl flex items-center justify-between">
              <div className="space-y-1.5 text-left">
                <h4 className="text-[10px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span>Accuracy Details</span>
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Correct (92%)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-[var(--color-text-secondary)]">
                    <XCircle className="w-3 h-3 text-red-500" />
                    <span>Incorrect (8%)</span>
                  </div>
                </div>
              </div>

              {/* Little SVG Ring */}
              <div className="w-16 h-16 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--color-secondary-bg)" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--color-success)" strokeWidth="4" strokeDasharray="92 8" strokeDashoffset="0" />
                </svg>
              </div>
            </div>

            {/* Skewed background decoration card inside mockup */}
            <div className="border border-[var(--color-border)] bg-[var(--color-secondary-bg)]/40 p-3.5 rounded-xl text-left space-y-1">
              <span className="px-2 py-0.5 bg-[var(--color-accent-light)] text-[var(--color-accent)] font-semibold text-[8px] rounded-full uppercase tracking-wider">
                Daily Word Challenge
              </span>
              <h5 className="font-bold text-xs text-[var(--color-text-primary)] mt-1">Alacrity</h5>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed">
                Brisk and cheerful readiness.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--color-border)] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-xl space-y-4 text-left shadow-sm hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center text-[var(--color-accent)] border border-[var(--color-border)]">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--color-text-primary)]">Adaptive Quizzes</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Challenge yourself with 10-question quizzes. Incorrect responses decrement scores while skipped items allow risk-free passage.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-xl space-y-4 text-left shadow-sm hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center text-[var(--color-accent)] border border-[var(--color-border)]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--color-text-primary)]">Retention Charts</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Visualise score statistics on SVG donut charts. Track performance histories and filter breakdown data per dictionary unit.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 rounded-xl space-y-4 text-left shadow-sm hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center text-[var(--color-accent)] border border-[var(--color-border)]">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--color-text-primary)]">Custom Collections</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Create and manage personalized terminology lists. Custom additions integrate dynamically with tests and analytics.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--color-border)] max-w-6xl mx-auto px-6 text-center text-xs text-[var(--color-text-tertiary)] relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
        <div className="flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>VocabFlow Learning Studio</span>
        </div>
        <p>© 2026 VocabFlow. Built for high-fidelity vocabulary retention.</p>
      </footer>
      
    </div>
  );
}
export default LandingPage;
