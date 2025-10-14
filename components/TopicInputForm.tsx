import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import Loader from './Loader';

interface TopicInputFormProps {
  onSubmit: (topic: string) => void;
  onShowHistory: () => void;
  isLoading: boolean;
}

const TopicInputForm: React.FC<TopicInputFormProps> = ({ onSubmit, onShowHistory, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  const exampleTopics = [
    'React Hooks',
    'Quantum Computing',
    'The History of Rome',
    'Machine Learning Basics',
  ];

  const selectExample = (example: string) => {
    setTopic(example);
    onSubmit(example);
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center animate-fade-in-up">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
        Personalized AI Learning Paths
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        Enter any topic you want to learn, and our AI will generate a customized, step-by-step learning path for you.
      </p>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'The French Revolution' or 'How APIs work'"
            className="w-full text-lg px-6 py-4 pr-36 bg-slate-800/80 border-2 border-slate-700 rounded-full text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 outline-none shadow-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-sky-600 hover:to-indigo-600 shadow-md disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-8">
        <p className="text-slate-400 mb-4">Or try one of these examples:</p>
        <div className="flex flex-wrap justify-center gap-3">
            {exampleTopics.map((ex, i) => (
                <button 
                    key={i}
                    onClick={() => selectExample(ex)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-full text-sm hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50"
                >
                    {ex}
                </button>
            ))}
        </div>
      </div>

      <div className="mt-12">
         <button 
            onClick={onShowHistory}
            className="flex items-center gap-2 mx-auto text-slate-400 hover:text-sky-400 transition-colors"
        >
            <HistoryIcon className="w-5 h-5"/>
            View Study History
        </button>
      </div>
    </div>
  );
};

export default TopicInputForm;
