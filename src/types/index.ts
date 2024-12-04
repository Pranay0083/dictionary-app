export interface Word {
  term: string;
  definition: string;
  unit: string;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  incorrectAnswers: Array<{
    term: string;
    correctDefinition: string;
    userAnswer: string;
  }>;
}