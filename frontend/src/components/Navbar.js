import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <h1>Task Management</h1>
        </div>

        <div className="navbar-menu">
          <ul>
            <li><a href="/tasks">Tasks</a></li>
            <li><a href="/users">Users</a></li>
          </ul>
        </div>

        <div className="navbar-user">
          <span className="user-name">{user?.full_name || user?.username}</span>
          <button className="btn-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
