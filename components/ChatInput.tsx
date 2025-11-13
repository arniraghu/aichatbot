
import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const SendIcon = ({ isLoading }: { isLoading: boolean }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 transform transition-transform duration-200 ${isLoading ? 'rotate-90' : 'rotate-0'}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 p-4 bg-zinc-900/70 backdrop-blur-sm border-t border-zinc-800">
      <div className="flex items-center space-x-4 max-w-4xl mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows={1}
          className="flex-grow bg-zinc-800 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow duration-200 text-zinc-200 placeholder-zinc-500 max-h-40"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="p-3 rounded-full bg-violet-600 text-white disabled:bg-zinc-700 disabled:cursor-not-allowed hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500 transition-all duration-200"
        >
          <SendIcon isLoading={isLoading} />
        </button>
      </div>
    </div>
  );
};