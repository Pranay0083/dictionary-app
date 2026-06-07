import React, { useState } from 'react';
import { X, Sparkles, ChevronDown, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Word } from '../types';

interface AddWordModalProps {
  onClose: () => void;
  onAddWord: (word: Word) => void;
}

export function AddWordModal({ onClose, onAddWord }: AddWordModalProps) {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  
  // Advanced options state (collapsed by default)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [unit, setUnit] = useState('U-Custom');
  const [example, setExample] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!term.trim()) {
      setError('Please provide a word term.');
      return;
    }
    if (!definition.trim()) {
      setError('Please provide a definition.');
      return;
    }

    onAddWord({
      term: term.trim(),
      definition: definition.trim(),
      unit: unit.trim() || 'U-Custom'
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Dark Blur Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-full max-w-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl relative overflow-hidden z-10 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-secondary-bg)]/40">
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">Add Custom Word</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary-bg)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 flex-1 space-y-4">
          {error && (
            <div className="p-3 bg-[var(--color-danger-bg)] border border-[var(--color-danger)]/20 text-[var(--color-danger)] text-xs font-semibold rounded-lg">
              {error}
            </div>
          )}

          {/* Word Term Input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Word / Term
            </label>
            <input
              type="text"
              placeholder="e.g., Soliloquy"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] outline-none transition-all"
              autoFocus
            />
          </div>

          {/* Definition Input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Definition
            </label>
            <textarea
              placeholder="e.g., An act of speaking one's thoughts aloud when by oneself..."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] outline-none transition-all resize-none"
            />
          </div>

          {/* Advanced Section - Collapsed by default */}
          <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-secondary-bg)]/20">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors select-none"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Advanced Details</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
            </button>

            {isAdvancedOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-card)]/50 pt-3">
                {/* Unit Tag Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    Unit Tag / Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., U16-D1 (Default: U-Custom)"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] outline-none transition-all"
                  />
                </div>

                {/* Example Sentence Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    Usage Example (Optional)
                  </label>
                  <textarea
                    placeholder="e.g., The actor delivered a striking soliloquy at the end of Act II."
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2.5 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-accent px-5 py-2.5 rounded-lg text-sm font-semibold"
            >
              Create Word
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
