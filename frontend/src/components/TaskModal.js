import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const TaskModal = ({ show, onClose, task, users, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setUserId(task.user_id || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setUserId('');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, status, user_id: userId || null };
    try {
      if (task) {
        await apiClient.put(`/tasks/${task.id}`, data);
      } else {
        await apiClient.post('/tasks', data);
      }
      onSave();
      onClose();
    } catch (err) {
      alert('Error saving task');
    }
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task ? 'Edit Task' : 'Create Task'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Assign to User</label>
                <select className="form-select" value={userId} onChange={(e) => setUserId(e.target.value)}>
                  <option value="">None</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;