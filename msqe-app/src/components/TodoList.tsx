import { Task } from '@/data/tasks';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onRecordDate: (id: number) => void;
  showDates: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onToggle, onRecordDate, showDates }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRecordDate={onRecordDate}
          showDates={showDates}
        />
      ))}
    </div>
  );
};

export default TodoList;
