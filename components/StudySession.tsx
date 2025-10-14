import React, { useState } from 'react';
import type { LearningStep } from '../types';
import Flashcard from './Flashcard';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckIcon } from './icons/CheckIcon';

interface StudySessionProps {
  step: LearningStep;
  stepIndex: number;
  totalSteps: number;
  onComplete: () => void;
  onBack: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ step, stepIndex, totalSteps, onComplete, onBack }) => {
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const nextFlashcard = () => {
    setCurrentFlashcardIndex((prev) => (prev + 1) % step.flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentFlashcardIndex((prev) => (prev - 1 + step.flashcards.length) % step.flashcards.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-indigo-400 font-semibold">Step {stepIndex + 1} / {totalSteps}</span>
          <h2 className="text-3xl font-bold text-sky-400 mt-1">{step.title}</h2>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Path
        </button>
      </div>

      <div className="space-y-8">
        {/* Description */}
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-slate-100 mb-3">Concepts</h3>
          <p className="text-slate-300 leading-relaxed prose prose-invert max-w-none">
            {step.description}
          </p>
        </div>

        {/* Key Concepts */}
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-slate-100 mb-4">Key Concepts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {step.keyConcepts.map((concept, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                        <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{concept}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Flashcards */}
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Flashcards Practice</h3>
          <p className="text-slate-400 mb-6 text-center">Click on the card to flip it and reveal the answer.</p>
          
          {step.flashcards && step.flashcards.length > 0 ? (
            <>
              <Flashcard
                key={currentFlashcardIndex}
                question={step.flashcards[currentFlashcardIndex].question}
                answer={step.flashcards[currentFlashcardIndex].answer}
              />
              <div className="flex justify-between items-center mt-4">
                <button onClick={prevFlashcard} className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
                    <ArrowLeftIcon className="w-5 h-5 text-slate-300" />
                </button>
                <span className="text-slate-400 font-semibold">
                  {currentFlashcardIndex + 1} / {step.flashcards.length}
                </span>
                <button onClick={nextFlashcard} className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
                    <ArrowRightIcon className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-slate-500">No flashcards available for this step.</p>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onComplete}
          className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-green-500/30"
        >
          <CheckIcon className="w-6 h-6" />
          Mark Step as Completed
        </button>
      </div>
    </div>
  );
};

export default StudySession;
