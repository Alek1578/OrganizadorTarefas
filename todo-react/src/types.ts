export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

/* 1 - */
export interface RegisterData { /* o que o front envia */
  email: string;
  password: string;
}

export interface AuthResponse { /* o que a API devolve */
  token: string;
  email: string;
}