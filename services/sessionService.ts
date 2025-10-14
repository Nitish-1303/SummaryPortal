import type { LearningStep, StudyHistoryItem } from '../types';

const SESSION_KEY = 'aiLearningPathSession';

interface SessionState {
  topic: string;
  path: LearningStep[];
  completedSteps: number[]; // Store as array of indices
}

// Save current learning path to sessionStorage
export const saveSession = (session: StudyHistoryItem): void => {
  try {
    const stateToSave: SessionState = {
        topic: session.topic,
        path: session.path,
        completedSteps: session.completedSteps,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Failed to save session to sessionStorage:", error);
  }
};

// Load learning path from sessionStorage
export const loadSession = (): StudyHistoryItem | null => {
  try {
    const storedSession = sessionStorage.getItem(SESSION_KEY);
    if (storedSession) {
      const parsed: SessionState = JSON.parse(storedSession);
      return {
          ...parsed,
          date: new Date().toISOString(), // date is not stored, create a new one
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to load session from sessionStorage:", error);
    return null;
  }
};

// Clear session from sessionStorage
export const clearSession = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Failed to clear session from sessionStorage:", error);
  }
};
