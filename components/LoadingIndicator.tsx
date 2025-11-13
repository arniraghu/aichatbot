
import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
      <span className="text-sm text-zinc-400 ml-2">AI is thinking...</span>
    </div>
  );
};