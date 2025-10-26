
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-700/50">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 max-w-4xl mx-auto">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask about our services..."
          disabled={isLoading}
          className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 disabled:opacity-50 transition-shadow"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
