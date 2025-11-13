
import React from 'react';
import type { Message as MessageType } from '../types';

// A simple markdown parser
const parseMarkdown = (text: string) => {
    let html = text;
    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Code `text`
    html = html.replace(/`([^`]+)`/g, '<code class="bg-zinc-700 rounded px-1 py-0.5 font-mono text-sm">$1</code>');
    // Newlines
    html = html.replace(/\n/g, '<br />');
    return { __html: html };
};

interface MessageProps {
  message: MessageType;
}

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm font-bold">U</span>
    </div>
);

const ModelIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h.5a1.5 1.5 0 011.5 1.5v1.25a1.5 1.5 0 01-1.5 1.5h-1.25a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5h1.25a1.5 1.5 0 011.5 1.5V16a1 1 0 001-1v-.5a1.5 1.5 0 013 0v.5a3 3 0 01-3 3h-.5a1 1 0 00-1 1v.5a1.5 1.5 0 01-3 0v-.5a1 1 0 00-1-1H10a3 3 0 01-3-3v-.5a1 1 0 00-1-1H5.5A1.5 1.5 0 014 14.75v-1.5a.5.5 0 00-.5-.5H2.25A1.5 1.5 0 01.75 11.5V10.25a1.5 1.5 0 011.5-1.5h1.25a.5.5 0 00.5-.5V6.75a.5.5 0 00-.5-.5H3.5a1.5 1.5 0 01-1.5-1.5V4a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a3 3 0 013 3v.5a1 1 0 001 1H10z" />
        </svg>
    </div>
);


export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-zinc-800 text-zinc-100 rounded-br-none'
    : message.isError 
    ? 'bg-red-800 text-red-100 rounded-bl-none'
    : 'bg-zinc-900 text-zinc-200 rounded-bl-none';
    
  return (
    <div className={`flex items-start gap-3 ${containerClasses}`}>
      {!isUser && <ModelIcon />}
      <div className={`max-w-md md:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${bubbleClasses}`}>
        <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={parseMarkdown(message.content)} />
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};