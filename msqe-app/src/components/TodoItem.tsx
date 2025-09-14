'use client';

import { Task } from '@/data/tasks';

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onRecordDate: (id:number) => void;
  showDates: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onRecordDate, showDates }) => {
  if (task.isHeading) {
    return <h2 className="text-xl font-bold mt-4 mb-2 text-white">{task.text}</h2>;
  }

  if (task.isSubHeading) {
    return <h3 className="text-lg font-semibold mt-3 mb-1 text-gray-300">{task.text}</h3>;
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <span className={`ml-3 text-white ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.text}
        </span>
      </div>
      <div className="flex items-center">
        <button
            onClick={() => onRecordDate(task.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
            Record Date
        </button>
        {showDates && task.dates.length > 0 && (
          <div className="ml-4 text-xs text-gray-400">
            {task.dates.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
