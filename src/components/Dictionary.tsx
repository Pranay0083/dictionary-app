import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  MoreVertical, 
  Trash2, 
  Plus, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddWordModal } from './AddWordModal';
import type { Word } from '../types';

interface DictionaryProps {
  words: Word[];
  onAddWord: (word: Word) => void;
  onDeleteWord: (term: string) => void;
}

export function Dictionary({ words, onAddWord, onDeleteWord }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuWord, setActiveMenuWord] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Sort state
  const [sortBy, setSortBy] = useState<'term' | 'unit'>('term');

  const filteredWords = words
    .filter(word => 
      word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.unit.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'term') return a.term.localeCompare(b.term);
      return a.unit.localeCompare(b.unit);
    });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Book className="w-6 h-6 text-[var(--color-accent)]" />
            <span>Vocabulary Dictionary</span>
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Search, sort, and manage all {words.length} definitions in your library.
          </p>
        </div>

        {/* Add Word Button */}
        {/* <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-accent px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 self-stretch sm:self-auto text-center justify-center"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Word</span>
        </button> */}
      </div>

      {/* Search & Sort Panel */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search bar left-aligned */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)] w-4 h-4" />
          <input
            type="text"
            placeholder="Search words, definitions, or unit tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] outline-none transition-all"
          />
        </div>

        {/* Sort Filter Options */}
        <div className="flex items-center gap-2 bg-[var(--color-secondary-bg)] p-1 rounded-lg border border-[var(--color-border)] shrink-0 self-start sm:self-auto">
          <span className="text-[10px] uppercase font-bold text-[var(--color-text-tertiary)] px-2">Sort</span>
          <button
            onClick={() => setSortBy('term')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              sortBy === 'term'
                ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Alphabetical
          </button>
          <button
            onClick={() => setSortBy('unit')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              sortBy === 'unit'
                ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Unit Tag
          </button>
        </div>
      </div>

      {/* Words Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredWords.map((word, index) => (
            <motion.div 
              key={`${word.term}-${word.unit}-${index}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="p-5 border border-[var(--color-border)] bg-[var(--color-bg-card)] rounded-xl hover:border-[var(--color-accent)]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Highlight custom words */}
              {word.unit === 'U-Custom' && (
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)]" />
              )}

              <div className="flex justify-between items-start gap-4 mb-2">
                {/* Term */}
                <h3 className="font-bold text-lg text-[var(--color-text-primary)] leading-snug">
                  {word.term}
                </h3>

                {/* Right side aligned elements */}
                <div className="flex items-center gap-1 shrink-0 relative">
                  {/* Unit Tag on the right */}
                  <span className="text-[10px] font-bold text-[var(--color-text-tertiary)] bg-[var(--color-secondary-bg)] px-2 py-0.5 rounded-full uppercase">
                    {word.unit}
                  </span>

                  {/* Triple dot menu for actions (Collapsing secondary buttons) */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuWord(activeMenuWord === word.term ? null : word.term)}
                      className="p-1 rounded hover:bg-[var(--color-secondary-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Actions dropdown */}
                    {activeMenuWord === word.term && (
                      <>
                        <div 
                          className="fixed inset-0 z-30" 
                          onClick={() => setActiveMenuWord(null)} 
                        />
                        <div className="absolute right-0 top-6 z-40 w-36 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg shadow-xl p-1">
                          <button
                            onClick={() => {
                              onDeleteWord(word.term);
                              setActiveMenuWord(null);
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Word</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Definition */}
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-1 flex-1">
                {word.definition}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredWords.length === 0 && (
          <div className="col-span-full py-12 text-center bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6">
            <p className="text-xs text-[var(--color-text-tertiary)] italic">
              No matching words found in your library.
            </p>
          </div>
        )}
      </div>

      {/* Add Word Modal overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddWordModal
            onClose={() => setIsAddModalOpen(false)}
            onAddWord={(w) => {
              onAddWord(w);
              setIsAddModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}