import React, { useState } from 'react';
import { Search, Book } from 'lucide-react';
import { Navigation } from './Navigation';
import type { Word } from '../types';

interface DictionaryProps {
  words: Word[];
  onBack: () => void;
}

export function Dictionary({ words, onBack }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredWords = words.filter(word => 
    word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <Navigation onBack={onBack} />
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Book className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Dictionary</h2>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search words or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWords.map((word, index) => (
              <div 
                key={`${word.term}-${word.unit}-${index}`}
                className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 
                         transition-colors duration-200 bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{word.term}</h3>
                    <p className="text-gray-600 mt-1">{word.definition}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{word.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}