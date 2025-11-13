
import React from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13 12l-2.293-2.293a1 1 0 010-1.414L13 6m0 0l2.293 2.293a1 1 0 010 1.414L13 12m-3 5l2.293 2.293a1 1 0 010 1.414L10 21l-2.293-2.293a1 1 0 010-1.414L10 15m0 0l2.293 2.293a1 1 0 010 1.414L10 21" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg">
      <div className="flex items-center justify-center space-x-3">
        <SparklesIcon />
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Gemini AI Chatbot
        </h1>
      </div>
    </header>
  );
};
