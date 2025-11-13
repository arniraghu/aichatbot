
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { startChat } from './services/geminiService';
import type { Message } from './types';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    try {
      chatRef.current = startChat();
       setMessages([
        { role: 'model', content: "Hello! I'm a helpful AI assistant. How can I help you today?" }
      ]);
    } catch (e: any) {
      setError(`Initialization Error: ${e.message}`);
      console.error(e);
    }
  }, []);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      if (!chatRef.current) {
        throw new Error("Chat session not initialized.");
      }
      const response = await chatRef.current.sendMessage(userInput);
      const modelMessage: Message = { role: 'model', content: response.text };
      setMessages(prevMessages => [...prevMessages, modelMessage]);
    } catch (e: any) {
      const errorMessage = `Error: ${e.message || 'Failed to get a response from the AI.'}`;
      setError(errorMessage);
      setMessages(prevMessages => [...prevMessages, { role: 'model', content: errorMessage, isError: true }]);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-200 font-sans">
      <Header />
      <MessageList messages={messages} />
      <div className="p-4">
        {isLoading && <LoadingIndicator />}
        {error && <p className="text-red-400 text-center text-sm mb-2">{error}</p>}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;