'use client';

import { useState } from 'react';
import { Phase, Task } from '@/data/tasks';
import TodoList from './TodoList';

interface TabsProps {
  phases: Phase[];
  onToggle: (id: number) => void;
  onRecordDate: (id: number) => void;
  showDates: boolean;
}

const Tabs: React.FC<TabsProps> = ({ phases, onToggle, onRecordDate, showDates }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-700">
        {phases.map((phase, index) => (
          <button
            key={phase.id}
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {`Phase ${index + 1}`}
          </button>
        ))}
      </div>
      <div className="py-4">
        <h1 className="text-2xl font-bold text-white mb-4">{phases[activeTab].title}</h1>
        <TodoList
          tasks={phases[activeTab].tasks}
          onToggle={onToggle}
          onRecordDate={onRecordDate}
          showDates={showDates}
        />
      </div>
    </div>
  );
};

export default Tabs;
