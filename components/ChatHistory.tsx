
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatHistory;
