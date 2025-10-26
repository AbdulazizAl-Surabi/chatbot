import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message } from './types';
import { SYSTEM_INSTRUCTION, INITIAL_GREETING } from './constants';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: INITIAL_GREETING }] },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<Chat | null>(null);

  const initializeChat = useCallback(() => {
    try {
      // ✅ Vite-Style Env Variable (funktioniert auf Vercel)
      const apiKey = import.meta.env.VITE_API_KEY;

      if (!apiKey) {
        throw new Error('VITE_API_KEY not set. Please check environment variables.');
      }

      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'model',
          parts: [
            {
              text: 'Error: Could not initialize AI Assistant. Please check the API key and configuration.',
            },
          ],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text }] };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error('Chat session is not initialized.');
      }

      const result = await chatRef.current.sendMessage({ message: text });
      const responseText = result.text;

      const modelMessage: Message = { role: 'model', parts: [{ text: responseText }] };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: 'Sorry, I encountered an error. Please try again.' }],
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <Header />
      <ChatHistory messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
