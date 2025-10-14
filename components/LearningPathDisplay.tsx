import React from 'react';
import type { LearningStep } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface LearningPathDisplayProps {
  path: LearningStep[];
  onStartStudy: (index: number) => void;
  onReset: () => void;
  completedSteps: Set<number>;
}

const LearningPathDisplay: React.FC<LearningPathDisplayProps> = ({ path, onStartStudy, onReset, completedSteps }) => {
  const completedCount = completedSteps.size;
  const totalSteps = path.length;
  const progressPercentage = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-slate-100">Your Learning Path</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Start Over
        </button>
      </div>

      <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300">Overall Progress</span>
            <span className="text-sm font-medium text-indigo-400">{completedCount} / {totalSteps} Steps Completed</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="space-y-4">
        {path.map((step, index) => {
          const isCompleted = completedSteps.has(index);
          return (
            <div
              key={index}
              className={`relative p-6 rounded-xl border transform hover:-translate-y-1 transition-all duration-300 shadow-lg ${
                isCompleted ? 'border-green-500/50 bg-slate-800' : 'border-slate-700 bg-slate-800/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-semibold">
                  <CheckIcon className="w-4 h-4" />
                  Completed
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-sm font-semibold text-indigo-400">Step {index + 1}</span>
                  <h3 className="text-xl font-bold text-sky-400 mt-1">{step.title}</h3>
                  <p className="text-slate-400 mt-2 max-w-prose">{step.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.keyConcepts.map((concept, cIndex) => (
                      <span key={cIndex} className="flex items-center gap-1.5 text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                        <CheckIcon className="w-3 h-3 text-green-400/70" />
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onStartStudy(index)}
                  className={`flex-shrink-0 mt-4 sm:mt-0 flex items-center justify-center gap-2 text-white font-bold py-2 px-5 rounded-lg transition-colors shadow-md ${
                    isCompleted 
                    ? 'bg-green-600 hover:bg-green-500 shadow-green-600/30' 
                    : 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/30'
                  }`}
                >
                  <BookOpenIcon className="w-5 h-5" />
                  {isCompleted ? 'Review' : 'Study'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathDisplay;
