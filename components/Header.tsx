
import React from 'react';
import { BotIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg flex items-center space-x-4">
      <div className="p-2 bg-indigo-600 rounded-full">
        <BotIcon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-white">Nexus Solutions AI Assistant</h1>
        <p className="text-sm text-gray-400">Your guide to IT & AI innovation</p>
      </div>
    </header>
  );
};

export default Header;
