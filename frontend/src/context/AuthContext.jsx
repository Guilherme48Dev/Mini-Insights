import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Provedor de autenticação que mantém o estado do usuário e token
export function AuthProvider({ children }) {
  // Recupera o usuário do localStorage ao iniciar (se existir)
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  );

  // Recupera o token do localStorage ao iniciar
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || ''
  );

  // Função chamada no login: armazena usuário e token no estado e no localStorage
  function loginUser(user, token) {
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Função chamada no logout: limpa estado e localStorage
  function logout() {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    // Proporciona acesso ao estado e funções via contexto
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para consumir o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}
