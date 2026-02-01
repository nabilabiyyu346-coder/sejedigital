import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import TaskModal from '../components/TaskModal';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await apiClient.get('/tasks');
      setTasks(res.data.tasks);
    } catch (err) {
      alert('Error fetching tasks');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/users');
      setUsers(res.data.users);
    } catch (err) {
      alert('Error fetching users');
    }
  };

  const openModal = (task = null) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleSave = () => {
    fetchTasks();
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await apiClient.patch(`/tasks/${id}/status`, { status });
      fetchTasks();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete task?')) {
      try {
        await apiClient.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        alert('Error deleting task');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tasks</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>Create Task</button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{users.find(u => u.id === task.user_id)?.name || 'None'}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => openModal(task)}>Edit</button>
                <button className="btn btn-sm btn-warning" onClick={() => handleUpdateStatus(task.id, 'inprogress')}>In Progress</button>
                <button className="btn btn-sm btn-success" onClick={() => handleUpdateStatus(task.id, 'done')}>Done</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TaskModal show={showModal} onClose={closeModal} task={selectedTask} users={users} onSave={handleSave} />
    </div>
  );
};

export default TasksPage;