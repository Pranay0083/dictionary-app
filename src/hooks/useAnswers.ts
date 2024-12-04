import { useState, useEffect, useCallback } from 'react';
import type { Word } from '../types';

export function useAnswers(
  currentQuestion: number,
  testWords: Word[],
  allWords: Word[]
) {
  const [answersMap, setAnswersMap] = useState<Map<number, string[]>>(new Map());

  const generateAnswers = useCallback((questionIndex: number) => {
    if (testWords.length === 0) return [];
    
    const currentWord = testWords[questionIndex];
    if (!currentWord) return [];

    const otherWords = allWords.filter((w) => w.term !== currentWord.term);
    const randomAnswers = otherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.definition);

    return [currentWord.definition, ...randomAnswers].sort(() => Math.random() - 0.5);
  }, [testWords, allWords]);

  // Generate answers for the first question immediately
  useEffect(() => {
    const newAnswers = generateAnswers(0);
    setAnswersMap(new Map([[0, newAnswers]]));
  }, [generateAnswers]);

  // Generate answers for subsequent questions
  useEffect(() => {
    if (!answersMap.has(currentQuestion)) {
      const newAnswers = generateAnswers(currentQuestion);
      setAnswersMap(prev => new Map(prev).set(currentQuestion, newAnswers));
    }
  }, [currentQuestion, generateAnswers, answersMap]);

  return answersMap.get(currentQuestion) || [];
}