import { useState } from 'react';
import type { FormEvent } from 'react';

interface TaskFormProps {
  onAdd: (text: string) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmed = text.trim();
    if (trimmed === '') {
      return;
    }

    onAdd(trimmed);
    setText('');
  }

  return (
    <form id="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-input">Nova tarefa</label>
      <input
        type="text"
        id="task-input"
        placeholder="Ex: Estudar HTML"
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;
