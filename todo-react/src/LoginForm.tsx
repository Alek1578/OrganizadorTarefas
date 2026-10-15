import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from './AuthContext';

function loginForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError(null);

        try {
            await login({ email, password });
        } catch {
            setError('Não foi possível efetuar o login.');
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Entrar</h2>
            <label htmlFor="login-email">Email</label>
            <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="login-password">Senha</label>
            <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Entrar</button>
        </form>
    )
}

export default loginForm;

