import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await apiClient.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      logout();
    }
  };

  const login = async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    await fetchCurrentUser();
  };

  const register = async (name, email, password) => {
    const res = await apiClient.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.data.token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    await fetchCurrentUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔑 INI YANG TADI HILANG
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
