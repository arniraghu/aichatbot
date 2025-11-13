
import React, { useRef, useEffect } from 'react';
import type { Message as MessageType } from '../types';
import { Message } from './Message';

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
