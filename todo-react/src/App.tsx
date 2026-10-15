import { useEffect, useState } from 'react';
import type { Task } from './types';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import * as api from './api';
import './App.css';
import { useAuth } from './AuthContext';
import AuthPage from './AuthPage';

function App() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!token) {
    setLoading(false);
    return;
  }

  api
    .fetchTasks(token)
    .then((data) => setTasks(data))
    .catch(() => setError('Não foi possível carregar as tarefas.'))
    .finally(() => setLoading(false));
}, [token]);

if (loading) {
  return <p className="loading-message">Carregando tarefas...</p>;
}

  async function addTask(text: string) {
    try {
      const newTask = await api.createTask(text, token!);
      setTasks([...tasks, newTask]);
    } catch {
      setError('Não foi possível adicionar a tarefa.');
    }
  }

  async function toggleTask(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    try {
      await api.updateTask(updatedTask, token!);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch {
      setError('Não foi possível atualizar a tarefa.');
    }
  }

  async function removeTask(id: number) {
    try {
      await api.deleteTask(id, token!);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      setError('Não foi possível remover a tarefa.');
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (!token) {
    return <AuthPage />;
  }

  return (
    <>
      <header>
        <h1>Minhas Tarefas</h1>
        <p>Organize seu dia, uma tarefa por vez.</p>
        <button type='button' onClick={logout}>Sair</button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <main>
        <section id="form-section">
          <TaskForm onAdd={addTask} />
        </section>

        <section id="list-section">
          <h2>Lista de tarefas</h2>
          <button type='button' className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}>Todas</button>
          <button type='button' className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}>Pendentes</button>
          <button type='button' className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}>Concluídas</button>
          <TaskList tasks={filteredTasks} onToggle={toggleTask} onRemove={removeTask} />
        </section>
      </main>

      <footer>
        <p>Projeto de estudo &mdash; Etapa 4: React + TypeScript</p>
      </footer>
    </>
  );
}

export default App;
