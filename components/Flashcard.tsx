// FIX: Create the Flashcard component.
import React, { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-64 perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6 bg-slate-700 rounded-xl border border-slate-600">
          <p className="text-slate-400 text-sm font-semibold mb-4">QUESTION</p>
          <h3 className="text-xl text-center font-bold text-slate-100">{question}</h3>
          <div className="absolute bottom-4 right-4 text-xs text-slate-500">
            Click to flip
          </div>
        </div>
        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center p-6 bg-sky-900/50 rounded-xl border border-sky-700">
           <p className="text-sky-400 text-sm font-semibold mb-4">ANSWER</p>
          <p className="text-lg text-center text-slate-200">{answer}</p>
          <div className="absolute bottom-4 right-4 text-xs text-slate-500">
            Click to flip
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
