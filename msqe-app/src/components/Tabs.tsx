'use client';

import { useState } from 'react';
import { Phase } from '@/data/tasks';
import type { DragEndEvent } from '@dnd-kit/core';
import dynamic from 'next/dynamic';

// Create a simple loading component to prevent layout shift
const TodoListSkeleton = () => (
  <div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center p-2 my-2 rounded-lg bg-gray-800 animate-pulse">
        <div className="h-5 w-5 bg-gray-700 rounded"></div>
        <div className="ml-3 h-5 flex-grow bg-gray-700 rounded"></div>
      </div>
    ))}
  </div>
);

// Dynamically import TodoList and disable Server-Side Rendering (SSR) for it
const ClientTodoList = dynamic(() => import('./TodoList'), {
  ssr: false,
  loading: () => <TodoListSkeleton />,
});

interface TabsProps {
  phases: Phase[];
  onToggle: (id: number) => void;
  onRecordDate: (id: number) => void;
  onUndoRecordDate: (id: number) => void;
  showDates: boolean;
  onAddTask: (phaseId: number, text: string, isSubHeading: boolean, afterTaskId: number) => void;
  onDeleteItem: (id: number) => void;
  onDragEnd: (event: DragEndEvent, phaseId: number) => void;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const { phases } = props;

  if (!phases || phases.length === 0) {
    return <div>No phases to display.</div>;
  }
  
  const activePhase = phases[activeTab];
  if (!activePhase) {
      setActiveTab(0);
      return <div>Loading phase...</div>
  }

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
        <h1 className="text-2xl font-bold text-white mb-4">{activePhase.title}</h1>
        <ClientTodoList
          phaseId={activePhase.id}
          tasks={activePhase.tasks}
          {...props}
        />
      </div>
    </div>
  );
};

export default Tabs;