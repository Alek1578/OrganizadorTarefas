import type { Task } from './types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

function TaskList({ tasks, onToggle, onRemove }: TaskListProps) {
  return (
    <ul id="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onRemove={() => onRemove(task.id)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
