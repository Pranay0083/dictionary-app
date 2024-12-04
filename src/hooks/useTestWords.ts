import { useState, useEffect } from 'react';
import type { Word } from '../types';

export function useTestWords(words: Word[]) {
  const [testWords, setTestWords] = useState<Word[]>([]);

  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
    setTestWords(shuffled);
  }, [words]);

  return testWords;
}