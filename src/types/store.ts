import type { Word } from './index';

export interface TestAttempt {
  id: string;
  date: string; // ISO string
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  skippedAnswersCount: number;
  incorrectDetails: Array<{
    term: string;
    correctDefinition: string;
    userAnswer: string;
  }>;
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  level: number;
  title: string;
}
