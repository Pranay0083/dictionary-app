import React from 'react';
import { BookOpen } from 'lucide-react';

interface TestSelectorProps {
  units: string[];
  onSelectUnit: (unit: string) => void;
}

export function TestSelector({ units, onSelectUnit }: TestSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-center mb-6">
        <BookOpen className="w-8 h-8 text-indigo-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Vocabulary Test</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {units.map((unit) => (
          <button
            key={unit}
            onClick={() => onSelectUnit(unit)}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow
                     border border-gray-200 hover:border-indigo-500 focus:outline-none
                     focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <span className="text-lg font-medium text-gray-700">{unit}</span>
          </button>
        ))}
      </div>
    </div>
  );
}