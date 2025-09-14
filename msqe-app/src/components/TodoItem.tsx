'use client';

import { Task } from '@/data/tasks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onRecordDate: (id: number) => void;
  onUndoRecordDate: (id: number) => void;
  onDeleteItem: (id: number) => void;
  // This is the fix: onAddItemClick is now optional, which resolves the build error.
  onAddItemClick?: (type: 'todo' | 'subheading') => void; 
  showDates: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onRecordDate, onUndoRecordDate, showDates, onDeleteItem, onAddItemClick }) => {
  const isDraggable = !task.isHeading && !task.isSubHeading;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const commonClasses = "flex items-center justify-between p-2 rounded-lg group";
  const hoverClasses = !task.isHeading && !task.isSubHeading ? "hover:bg-gray-800" : "";

  if (task.isHeading) {
    return (
      <div className={`${commonClasses} relative`}>
        <div className="flex items-center flex-1">
          <button onClick={() => onDeleteItem(task.id)} className="absolute -left-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
          <h2 className="text-xl font-bold my-2 text-white">{task.text}</h2>
        </div>
        {/* The '+' button is kept for your current logic but will only render if onAddItemClick is passed */}
        {onAddItemClick && <button onClick={() => onAddItemClick('subheading')} className="text-gray-600 hover:text-green-500 opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold">+</button>}
      </div>
    );
  }

  if (task.isSubHeading) {
    return (
      <div className={`${commonClasses} relative`}>
        <div className="flex items-center flex-1">
          <button onClick={() => onDeleteItem(task.id)} className="absolute -left-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
          <h3 className="text-lg font-semibold my-1 text-gray-300">{task.text}</h3>
        </div>
        {onAddItemClick && <button onClick={() => onAddItemClick('todo')} className="text-gray-600 hover:text-green-500 opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold">+</button>}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={`${commonClasses} ${hoverClasses} relative`}>
      <div className="flex items-center flex-1 min-w-0 mr-4">
        <button onClick={() => onDeleteItem(task.id)} className="absolute -left-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
        <div {...attributes} {...listeners} className="flex items-center flex-1 cursor-grab active:cursor-grabbing">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 flex-shrink-0"
          />
          <span className={`ml-3 text-white truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.text}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button onClick={() => onRecordDate(task.id)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
          Record Date
        </button>
        {task.dates.length > 0 && (
          <button onClick={() => onUndoRecordDate(task.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">
            Undo
          </button>
        )}
        {showDates && task.dates.length > 0 && (
          <div className="ml-2 text-xs text-gray-400 hidden sm:block">
            {task.dates.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;