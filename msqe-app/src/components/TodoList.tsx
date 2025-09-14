'use client';

import { useState } from 'react';
import { Task } from '@/data/tasks';
import TodoItem from './TodoItem';
import { DragEndEvent } from '@dnd-kit/core'; // Import missing type

// This is the small form component you provided. No changes are needed here.
const AddItemForm: React.FC<{
  placeholder: string;
  buttonText: string;
  onSubmit: (text: string) => void;
}> = ({ placeholder, buttonText, onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 my-2 ml-8 pl-1">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
};

// The interface needs to be updated to accept the onDeleteItem and onDragEnd functions.
interface TodoListProps {
  phaseId: number;
  tasks: Task[];
  onToggle: (id: number) => void;
  onRecordDate: (id: number) => void;
  showDates: boolean;
  onAddTask: (phaseId: number, text: string, isSubHeading: boolean, afterTaskId: number) => void;
  onUndoRecordDate: (id: number) => void;
  onDeleteItem: (id: number) => void; // Added missing prop
  onDragEnd: (event: DragEndEvent, phaseId: number) => void; // Added missing prop
}

const TodoList: React.FC<TodoListProps> = ({ phaseId, tasks, onToggle, onRecordDate, showDates, onAddTask, onUndoRecordDate, onDeleteItem }) => {
  // Your existing logic for creating task groups is preserved.
  const taskGroups: (Task | { type: 'add-todo' | 'add-subheading'; parentId: number })[] = [];

  tasks.forEach((task, index) => {
    taskGroups.push(task);
    const nextTask = tasks[index + 1];

    if (task.isHeading) {
      taskGroups.push({ type: 'add-subheading', parentId: task.id });
    }
    
    if (task.isSubHeading && (!nextTask || nextTask.isHeading)) {
      taskGroups.push({ type: 'add-todo', parentId: task.id });
    } else if (!task.isHeading && !task.isSubHeading && (!nextTask || nextTask.isHeading || nextTask.isSubHeading)) {
        let parentSubheadingId = -1;
        for (let i = index; i >= 0; i--) {
            if (tasks[i].isSubHeading) {
                parentSubheadingId = tasks[i].id;
                break;
            }
        }
        if(parentSubheadingId !== -1) {
            taskGroups.push({ type: 'add-todo', parentId: parentSubheadingId });
        }
    }
  });

  const uniqueTaskGroups = taskGroups.filter((item, index, self) => {
      if ('type' in item) {
          return index === self.findIndex(t => 'type' in t && t.type === item.type && t.parentId === item.parentId);
      }
      return true;
  });

  return (
    <div>
      {uniqueTaskGroups.map((item) => {
        if ('type' in item) {
          if (item.type === 'add-subheading') {
            return (
              <AddItemForm
                key={`add-subheading-${item.parentId}`}
                placeholder="Enter new subcategory..."
                buttonText="Add Subcategory"
                onSubmit={(text) => onAddTask(phaseId, text, true, item.parentId)}
              />
            );
          }
          if (item.type === 'add-todo') {
            return (
              <AddItemForm
                key={`add-todo-${item.parentId}`}
                placeholder="Enter new to-do..."
                buttonText="Add To-Do"
                onSubmit={(text) => onAddTask(phaseId, text, false, item.parentId)}
              />
            );
          }
        } else {
          return (
            <TodoItem
              key={item.id}
              task={item}
              onToggle={onToggle}
              onRecordDate={onRecordDate}
              showDates={showDates}
              onUndoRecordDate={onUndoRecordDate}
              onDeleteItem={onDeleteItem} // The missing prop is now passed here.
              // The onAddItemClick prop is no longer needed by TodoItem, so it's not included.
              // The onMouseEnter prop for the hover feature is also not needed with this logic.
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default TodoList;