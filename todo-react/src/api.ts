import type { Task, RegisterData, AuthResponse } from './types';

const API_URL = 'http://localhost:5122/api/tasks';

export async function fetchTasks(token: string): Promise<Task[]> {
    const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas');
  }

  return response.json();
}

export async function createTask(text: string, token: string): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text, completed: false }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar tarefa');
  }

  return response.json();
}
  export async function updateTask(task: Task, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

     if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa.");
     }
  }

  export async function deleteTask(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

    if (!response.ok) {
        throw new Error('Erro ao remover uma tarefa.');
  }
}

/* API e RESPOSTA abaixo */

const AUTH_URL = 'http://localhost:5122/api/auth';

export async function register(data: RegisterData): Promise<AuthResponse> {
   const response = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    throw new Error('Não foi possível criar a conta.');
   }

   return response.json();
}

export async function login(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    throw new Error('Credenciais inválidas.');
   }

   return response.json();
}