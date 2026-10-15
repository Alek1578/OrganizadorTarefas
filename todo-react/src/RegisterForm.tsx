import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from './AuthContext';

function RegisterForm() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      await register({ email, password });
    } catch {
      setError('Não foi possível criar a conta.');
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Criar conta</h2>
      <label htmlFor="register-email">Email</label>
      <input
        type="email"
        id="register-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="register-password">Senha</label>
      <input
        type="password"
        id="register-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default RegisterForm;