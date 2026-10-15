import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';
import * as api from './api';
import type { RegisterData } from "./types";

interface authContextType {
    email: string | null;
    token: string | null;
    login: (data: RegisterData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<authContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode}) {
   const [email, setEmail] = useState<string | null>(() => localStorage.getItem('email'));
   const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
   
   async function login(data: RegisterData) {
     const result = await api.login(data);
     setToken(result.token);
     setEmail(result.email);
     localStorage.setItem('token', result.token);
     localStorage.setItem('email', result.email);
   }

   async function register(data: RegisterData) {
     const result = await api.register(data);
     setToken(result.token);
     setEmail(result.email);
     localStorage.setItem('token', result.token);
     localStorage.setItem('email', result.email);
   }

   function logout() {
    setToken(null);
    setEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
   }

   return (
    <AuthContext.Provider value={{ email, token, login, register, logout }}>
        {children}
    </AuthContext.Provider>
   );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth precisa ser usado dentro de um AuthProvider');       
    }
    return context;
}