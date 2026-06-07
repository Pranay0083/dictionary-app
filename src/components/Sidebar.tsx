import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  PenTool,
  Settings,
  Moon,
  Sun,
  RefreshCw,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  currentView: 'dashboard' | 'dictionary' | 'analytics' | 'test';
  setView: (view: 'dashboard' | 'dictionary' | 'analytics' | 'test') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onResetData: () => void;
  totalWordsLearned: number;
}

export function Sidebar({
  currentView,
  setView,
  theme,
  toggleTheme,
  onResetData,
  totalWordsLearned
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Calculate dynamic level based on vocabulary size
  const userLevel = Math.max(1, Math.floor(totalWordsLearned / 10) + 1);
  const levelTitle = userLevel >= 5 ? 'Vocabulary Master' : userLevel >= 3 ? 'Word Explorer' : 'Apprentice';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dictionary', label: 'Dictionary', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'test', label: 'Take Test', icon: PenTool }
  ] as const;

  const handleNav = (view: typeof menuItems[number]['id']) => {
    setView(view);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--color-bg-card)] border-r border-[var(--color-border)] p-4 select-none">
      {/* App Header */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="p-2 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-lg">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-[var(--color-text-primary)]">VocabFlow</h1>
          <span className="text-xs text-[var(--color-text-tertiary)] font-medium">Learning Studio</span>
        </div>
      </div>

      {/* Navigation List - Tightened Spacing */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${isActive
                  ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/10'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary-bg)] hover:text-[var(--color-text-primary)]'
                }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Account Profile Card - Standard and Clean (No Gradients) */}
      <div className="mt-auto pt-4 border-t border-[var(--color-border)] relative">
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--color-secondary-bg)] mb-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-slate-700 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-lg border border-[var(--color-border)]">
            PV
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">Guest</h4>
            <p className="text-xs text-[var(--color-text-tertiary)] truncate">Level {userLevel} · {levelTitle}</p>
          </div>
        </div>

        {/* Settings Toggle & Popover Menu */}
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary-bg)] hover:text-[var(--color-text-primary)] transition-colors border border-[var(--color-border)] bg-[var(--color-bg-card)]"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </div>
            <span className="text-[10px] bg-[var(--color-border)] px-1.5 py-0.5 rounded text-[var(--color-text-tertiary)]">Open</span>
          </button>

          {/* Settings Popover Dropdown */}
          <AnimatePresence>
            {isSettingsOpen && (
              <>
                {/* Backdrop Clicker */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSettingsOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-11 left-0 right-0 z-50 p-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg shadow-xl"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)]">
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">Preferences</span>
                    <button
                      onClick={() => setIsSettingsOpen(false)}
                      className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Theme Switcher */}
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary-bg)] hover:text-[var(--color-text-primary)] transition-colors text-left mb-1.5"
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase font-mono">{theme}</span>
                  </button>

                  {/* Reset Actions (Destructive) */}
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all test statistics, custom words, and learning history? This action is irreversible.')) {
                        onResetData();
                        setIsSettingsOpen(false);
                      }
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-red-500" />
                    <span>Reset Progress</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[var(--color-accent)]" />
          <span className="font-bold text-sm text-[var(--color-text-primary)]">VocabFlow</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-[var(--color-text-primary)] hover:bg-[var(--color-secondary-bg)] rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[var(--color-bg-card)] z-50 shadow-2xl lg:hidden"
            >
              {/* Close Button Inside Mobile Drawer */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary-bg)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
