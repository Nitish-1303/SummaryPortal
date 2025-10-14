import type { StudyHistoryItem } from '../types';

const HISTORY_KEY = 'aiLearningPathHistory';

// Load history from localStorage
export const loadHistory = (): StudyHistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      const parsedHistory: StudyHistoryItem[] = JSON.parse(storedHistory);
      // Sort by most recent date
      return parsedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return [];
  } catch (error) {
    console.error("Failed to load history from localStorage:", error);
    return [];
  }
};

// Save a new or updated history item
export const saveHistory = (itemToSave: StudyHistoryItem): StudyHistoryItem[] => {
  try {
    const currentHistory = loadHistory();
    // Find if an item with the same topic already exists
    const existingIndex = currentHistory.findIndex(item => item.topic === itemToSave.topic);

    let updatedHistory: StudyHistoryItem[];

    if (existingIndex > -1) {
      // Update existing item
      currentHistory[existingIndex] = itemToSave;
      updatedHistory = currentHistory;
    } else {
      // Add as a new item
      updatedHistory = [itemToSave, ...currentHistory];
    }

    // Sort again to be safe
    updatedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Limit history size if needed, e.g., to 20 items
    if (updatedHistory.length > 20) {
        updatedHistory = updatedHistory.slice(0, 20);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error("Failed to save history to localStorage:", error);
    return loadHistory(); // Return existing history on failure
  }
};
