import React from 'react';
import ChatInterface from './ChatInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-8">My App</h1>
      <ChatInterface />
    </div>
  );
};

export default App;

