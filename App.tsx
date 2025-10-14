import React, { useState, useEffect } from 'react';
import TopicInputForm from './components/TopicInputForm';
import LearningPathDisplay from './components/LearningPathDisplay';
import StudySession from './components/StudySession';
import StudyHistoryDisplay from './components/StudyHistoryDisplay';
import DogCursor from './components/DogCursor';
import { BrainCircuitIcon } from './components/icons/BrainCircuitIcon';
import { generateLearningPath } from './services/geminiService';
import { loadHistory, saveHistory } from './services/historyService';
import { loadSession, saveSession, clearSession } from './services/sessionService';
import type { LearningStep, StudyHistoryItem } from './types';

type AppState = 'idle' | 'loading' | 'path' | 'studying' | 'history';

function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [learningPath, setLearningPath] = useState<LearningStep[]>([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [studyHistory, setStudyHistory] = useState<StudyHistoryItem[]>([]);

  useEffect(() => {
    // Load history on initial mount
    setStudyHistory(loadHistory());
    
    // Attempt to load a session from sessionStorage
    const session = loadSession();
    if (session) {
      setCurrentTopic(session.topic);
      setLearningPath(session.path);
      setCompletedSteps(new Set(session.completedSteps));
      setAppState('path');
    }
  }, []);
  
  const handleGeneratePath = async (topic: string) => {
    setAppState('loading');
    setError(null);
    setCurrentTopic(topic);
    try {
      const path = await generateLearningPath(topic);
      setLearningPath(path);
      setCompletedSteps(new Set());
      setAppState('path');
      
      const newHistoryItem: StudyHistoryItem = {
        topic,
        path,
        completedSteps: [],
        date: new Date().toISOString(),
      };
      saveSession(newHistoryItem);
      const updatedHistory = saveHistory(newHistoryItem);
      setStudyHistory(updatedHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('idle');
    }
  };

  const handleStartStudy = (index: number) => {
    setCurrentStudyIndex(index);
    setAppState('studying');
  };

  const handleCompleteStep = () => {
    const newCompletedSteps = new Set(completedSteps).add(currentStudyIndex);
    setCompletedSteps(newCompletedSteps);
    setAppState('path');

    const updatedHistoryItem: StudyHistoryItem = {
      topic: currentTopic,
      path: learningPath,
      completedSteps: Array.from(newCompletedSteps),
      date: new Date().toISOString(),
    };
    saveSession(updatedHistoryItem);
    const updatedHistory = saveHistory(updatedHistoryItem);
    setStudyHistory(updatedHistory);
  };
  
  const handleReset = () => {
    clearSession();
    setLearningPath([]);
    setCurrentTopic('');
    setCompletedSteps(new Set());
    setAppState('idle');
    setError(null);
  };

  const handleShowHistory = () => {
    setStudyHistory(loadHistory()); // reload to be fresh
    setAppState('history');
  }

  const handleSelectHistoryItem = (item: StudyHistoryItem) => {
    setCurrentTopic(item.topic);
    setLearningPath(item.path);
    setCompletedSteps(new Set(item.completedSteps));
    saveSession(item);
    setAppState('path');
  };

  const handleBackToIdle = () => {
    setAppState('idle');
  }

  const renderContent = () => {
    switch (appState) {
      case 'studying':
        return (
          <StudySession
            step={learningPath[currentStudyIndex]}
            stepIndex={currentStudyIndex}
            totalSteps={learningPath.length}
            onComplete={handleCompleteStep}
            onBack={() => setAppState('path')}
          />
        );
      case 'path':
        return (
          <LearningPathDisplay
            path={learningPath}
            onStartStudy={handleStartStudy}
            onReset={handleReset}
            completedSteps={completedSteps}
          />
        );
      case 'history':
        return (
          <StudyHistoryDisplay 
            history={studyHistory}
            onSelect={handleSelectHistoryItem}
            onBack={handleBackToIdle}
          />
        );
      case 'idle':
      case 'loading':
      default:
        return (
          <TopicInputForm
            onSubmit={handleGeneratePath}
            onShowHistory={handleShowHistory}
            isLoading={appState === 'loading'}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans cursor-none">
      <DogCursor />
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-3">
            <BrainCircuitIcon className="w-10 h-10 text-sky-400" />
            <h1 className="text-2xl font-bold text-slate-300 tracking-wider">
              AI Study Planner
            </h1>
          </div>
        </header>

        <main className="flex justify-center">
            {renderContent()}
        </main>

        {error && (
            <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-fade-in-up">
                <p><strong>Error:</strong> {error}</p>
                <button onClick={() => setError(null)} className="absolute top-1 right-2 text-lg">&times;</button>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;