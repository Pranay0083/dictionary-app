import React from 'react';
import { BookOpen, PenTool } from 'lucide-react';

interface HomePageProps {
  onStartTest: () => void;
  onViewDictionary: () => void;
}

export function HomePage({ onStartTest, onViewDictionary }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vocabulary Learning Center
          </h1>
          <p className="text-lg text-gray-600">
            Enhance your vocabulary through interactive tests and comprehensive dictionary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={onStartTest}
            className="group p-8 bg-white rounded-xl shadow-md hover:shadow-lg 
                     transition-all duration-200 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 
                          transition-colors duration-200">
                <PenTool className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Take a Test</h2>
            </div>
            <p className="text-gray-600">
              Challenge yourself with a 10-question vocabulary quiz to test your knowledge
            </p>
          </button>

          <button
            onClick={onViewDictionary}
            className="group p-8 bg-white rounded-xl shadow-md hover:shadow-lg 
                     transition-all duration-200 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 
                          transition-colors duration-200">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Dictionary</h2>
            </div>
            <p className="text-gray-600">
              Browse and search through all vocabulary words and their definitions
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}