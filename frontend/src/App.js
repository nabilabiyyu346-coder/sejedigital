import React, { useState } from 'react';
import Login from './components/PrivateRoute';
import UserManagement from './components/UserModal';
import TaskManagement from './components/TaskModal';
import axios from 'axios';

const App = () => {
  const [token, setToken ] = useState(localStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(!!token);

  axios.defaults.baseURL = 'http://localhost:5000/api';
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setLoggedIn(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setLoggedIn(false);
    axios.defaults.headers.common['Authorization'] = '';
  };

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <UserManagement />
      <TaskManagement />
    </div>
  );
};

export default App;