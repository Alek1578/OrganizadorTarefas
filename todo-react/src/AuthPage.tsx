import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthPage() {
    const [IsRegistering, setIsRegistering] = useState(false);

    return (
        <div className="auth-page">
            {IsRegistering ? <RegisterForm /> : <LoginForm />}

            <button type="button" onClick={() => setIsRegistering(!IsRegistering)}>
                {IsRegistering ? 'Já tenho conta' : 'Criar uma conta'}
            </button>
        </div>
    );
}

export default AuthPage;