import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [account, setAccount] = useState(() => {
    try { return JSON.parse(localStorage.getItem('account')); } catch { return null; }
  });

  function login(token, account) {
    localStorage.setItem('token', token);
    localStorage.setItem('account', JSON.stringify(account));
    setToken(token);
    setAccount(account);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    setToken(null);
    setAccount(null);
  }

  return (
    <AuthContext.Provider value={{ token, account, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
