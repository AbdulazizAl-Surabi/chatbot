
import React from 'react';
import { BotIcon } from './icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 flex-shrink-0 bg-indigo-600 rounded-full flex items-center justify-center">
        <BotIcon className="w-5 h-5 text-white" />
      </div>
      <div className="max-w-sm p-4 rounded-2xl rounded-tl-none bg-gray-800 flex items-center space-x-2">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
