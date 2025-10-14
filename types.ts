export interface Flashcard {
  question: string;
  answer: string;
}

export interface LearningStep {
  title: string;
  description: string;
  keyConcepts: string[];
  flashcards: Flashcard[];
}

export interface StudyHistoryItem {
  topic: string;
  path: LearningStep[];
  completedSteps: number[]; // array of indices
  date: string;
}
