import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const UserModal = ({ show, onClose, user, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      if (user) {
        await apiClient.put(`/users/${user.id}`, data);
      } else {
        await apiClient.post('/users', data);
      }
      onSave();
      onClose();
    } catch (err) {
      alert('Error saving user');
    }
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user ? 'Edit User' : 'Create User'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label>Password {user ? '(optional)' : ''}</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required={!user} />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;