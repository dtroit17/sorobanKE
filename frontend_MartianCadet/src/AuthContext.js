
import React, { createContext, useState, useEffect } from 'react';
import { getToken, setAuthHeader, login, logout } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: getToken(), isAuthenticated: !!getToken() });

  useEffect(() => {
    setAuthHeader();
  }, [auth.token]);

  const handleLogin = async (email, password) => {
    const token = await login(email, password);
    setAuth({ token, isAuthenticated: true });
  };

  const handleLogout = () => {
    logout();
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
