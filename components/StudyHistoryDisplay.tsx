import React from 'react';
import type { StudyHistoryItem } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface StudyHistoryDisplayProps {
  history: StudyHistoryItem[];
  onSelect: (item: StudyHistoryItem) => void;
  onBack: () => void;
}

const StudyHistoryDisplay: React.FC<StudyHistoryDisplayProps> = ({ history, onSelect, onBack }) => {
  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-100">Study History</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-center text-slate-400 p-8 bg-slate-800/50 rounded-lg">
          You have no study history yet.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => {
            const totalSteps = item.path.length;
            const completedCount = item.completedSteps.length;
            const progressPercentage = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-700 bg-slate-800/50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-sky-400">{item.topic}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Last studied: {new Date(item.date).toLocaleDateString()}
                    </p>
                    
                    <div className="mt-4">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-slate-400">Progress</span>
                          <span className="text-xs font-medium text-indigo-400">{completedCount} / {totalSteps} Steps</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelect(item)}
                    className="flex-shrink-0 mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-sky-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-sky-500 transition-colors shadow-md shadow-sky-600/30"
                  >
                    <BookOpenIcon className="w-5 h-5" />
                    Resume
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudyHistoryDisplay;
