'use client';

import { useState } from 'react';
import { initialPhases, Phase } from '@/data/tasks';
import Tabs from '@/components/Tabs';

export default function Home() {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [showDates, setShowDates] = useState(false);

  const handleToggle = (taskId: number) => {
    setPhases(
      phases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }))
    );
  };

  const handleRecordDate = (taskId: number) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    setPhases(
      phases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.id === taskId
            ? { ...task, dates: [...task.dates, today] }
            : task
        ),
      }))
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gray-900 text-white">
      <div className="w-full max-w-4xl">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">MSQE Preparation Checklist ✅</h1>
          <div className="flex items-center">
            <span className="mr-3 text-lg">Show Dates</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showDates}
                onChange={() => setShowDates(!showDates)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </header>

        <Tabs
          phases={phases}
          onToggle={handleToggle}
          onRecordDate={handleRecordDate}
          showDates={showDates}
        />
      </div>
    </main>
  );
}
