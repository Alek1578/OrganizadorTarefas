import type { Task } from './types';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
}

function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <li
      className={`task-item${task.completed ? ' completed' : ''}`}
      onClick={onToggle}
    >
      <span>{task.text}</span>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
      >
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
