
import React from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon } from './icons';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserModel = message.role === 'model';
  
  const formattedText = message.parts[0].text
    .split('\n')
    .map((line, i) => <p key={i}>{line}</p>);

  return (
    <div className={`flex items-start gap-4 ${!isUserModel ? 'justify-end' : ''}`}>
      {isUserModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-indigo-600 rounded-full flex items-center justify-center">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl shadow-md ${
          isUserModel
            ? 'bg-gray-800 text-gray-200 rounded-tl-none'
            : 'bg-indigo-600 text-white rounded-br-none'
        }`}
      >
        <div className="prose prose-invert prose-p:my-0">{formattedText}</div>
      </div>
      {!isUserModel && (
        <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
