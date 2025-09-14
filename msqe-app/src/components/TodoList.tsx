'use client';

import { useState } from 'react';
import { Task } from '@/data/tasks';
import TodoItem from './TodoItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const AddItemForm: React.FC<{
  placeholder: string;
  buttonText: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}> = ({ placeholder, buttonText, onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 my-2 ml-8 pl-1">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        autoFocus
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
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

interface TodoListProps {
  phaseId: number;
  tasks: Task[];
  onToggle: (id: number) => void;
  onRecordDate: (id: number) => void;
  onUndoRecordDate: (id: number) => void;
  showDates: boolean;
  onAddTask: (phaseId: number, text: string, isSubHeading: boolean, afterTaskId: number) => void;
  onDeleteItem: (id: number) => void;
  onDragEnd: (event: DragEndEvent, phaseId: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const { phaseId, tasks, onAddTask, onDragEnd, ...rest } = props;
  const [addingTo, setAddingTo] = useState<{ parentId: number; type: 'todo' | 'subheading' } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLocalDragEnd = (event: DragEndEvent) => {
    onDragEnd(event, phaseId);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleLocalDragEnd}>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <TodoItem
                task={task}
                onAddItemClick={(type) => setAddingTo({ parentId: task.id, type })}
                {...rest}
              />
              {addingTo?.parentId === task.id && (
                <AddItemForm
                  placeholder={addingTo.type === 'subheading' ? 'Enter new subcategory...' : 'Enter new to-do...'}
                  buttonText={addingTo.type === 'subheading' ? 'Add Subcategory' : 'Add To-Do'}
                  onSubmit={(text) => {
                    onAddTask(phaseId, text, addingTo.type === 'subheading', task.id);
                    setAddingTo(null);
                  }}
                  onCancel={() => setAddingTo(null)}
                />
              )}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;