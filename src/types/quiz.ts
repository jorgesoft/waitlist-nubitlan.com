export interface QuizConfig {
  quiz: {
    title: string;
    description: string;
    startQuestionId: string;
  };
  questions: Question[];
  outcomes: Outcome[];
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  text: string;
  nextQuestionId?: string;
  outcomeId?: string;
}

export interface Outcome {
  id: string;
  level: 'ready' | 'partially-ready' | 'needs-work';
  title: string;
  message: string;
  recommendations: string[];
}
