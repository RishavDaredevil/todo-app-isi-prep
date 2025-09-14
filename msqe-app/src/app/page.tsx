'use client';

import { useState, useEffect } from 'react';
import { initialPhases, Phase, Task } from '@/data/tasks';
import Tabs from '@/components/Tabs';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const LOCAL_STORAGE_KEY = 'msqe-checklist-phases';

export default function Home() {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [showDates, setShowDates] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        setPhases(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
      setPhases(initialPhases);
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(phases));
    }
  }, [phases, isLoaded]);

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
    const today = new Date().toLocaleDateString('en-CA');
    setPhases(
      phases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) => {
          if (task.id === taskId && !task.dates.includes(today)) {
            return { ...task, dates: [...task.dates, today] };
          }
          return task;
        }),
      }))
    );
  };

  const handleUndoRecordDate = (taskId: number) => {
    setPhases(
      phases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) => {
          if (task.id === taskId && task.dates.length > 0) {
            return { ...task, dates: task.dates.slice(0, -1) };
          }
          return task;
        }),
      }))
    );
  };

  const handleAddTask = (phaseId: number, text: string, isSubHeading: boolean, afterTaskId: number) => {
    if (!text.trim()) return;

    const newId = Math.max(0, ...phases.flatMap(p => p.tasks.map(t => t.id))) + 1;
    const newTask: Task = {
      id: newId, text, completed: false, dates: [], isSubHeading,
    };

    setPhases(currentPhases =>
      currentPhases.map(phase => {
        if (phase.id === phaseId) {
          const newTasks = [...phase.tasks];
          const parentIndex = newTasks.findIndex(t => t.id === afterTaskId);

          if (parentIndex !== -1) {
            let insertAtIndex = parentIndex + 1;
            if (!isSubHeading) {
              for (let i = parentIndex + 1; i < newTasks.length; i++) {
                if (newTasks[i].isHeading || newTasks[i].isSubHeading) break;
                insertAtIndex = i + 1;
              }
            }
            newTasks.splice(insertAtIndex, 0, newTask);
          } else {
            newTasks.push(newTask);
          }
          return { ...phase, tasks: newTasks };
        }
        return phase;
      })
    );
  };

  const handleDeleteItem = (taskId: number) => {
    setPhases(currentPhases =>
      currentPhases.map(phase => {
        const tasks = [...phase.tasks];
        const itemIndex = tasks.findIndex(t => t.id === taskId);
        if (itemIndex === -1) return phase;

        const itemToDelete = tasks[itemIndex];
        let itemsToRemove = 1; // Default to removing just one item

        // If it's a heading or subheading, remove all children until the next one
        if (itemToDelete.isHeading || itemToDelete.isSubHeading) {
          for (let i = itemIndex + 1; i < tasks.length; i++) {
            if (tasks[i].isHeading || tasks[i].isSubHeading) {
              break;
            }
            itemsToRemove++;
          }
        }

        tasks.splice(itemIndex, itemsToRemove);
        return { ...phase, tasks };
      })
    );
  };

  const handleDragEnd = (event: DragEndEvent, phaseId: number) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPhases(currentPhases => {
        return currentPhases.map(phase => {
          if (phase.id === phaseId) {
            const oldIndex = phase.tasks.findIndex(t => t.id === active.id);
            const newIndex = phase.tasks.findIndex(t => t.id === over.id);
            return {
              ...phase,
              tasks: arrayMove(phase.tasks, oldIndex, newIndex),
            };
          }
          return phase;
        });
      });
    }
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
          onUndoRecordDate={handleUndoRecordDate}
          showDates={showDates}
          onAddTask={handleAddTask}
          onDeleteItem={handleDeleteItem}
          onDragEnd={handleDragEnd}
        />
      </div>
    </main>
  );
}