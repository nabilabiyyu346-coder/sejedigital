import React, { useEffect, useState } from 'react';
import { taskService, userService } from '../services';
import { useAuth } from '../context/useAuth';
import TaskModal from '../components/TaskModal';
import '../styles/tasks.css';

const TasksPage = () => {
  const { user: currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const tasksResponse = await taskService.getAll();
      const usersResponse = await userService.getAll();
      setTasks(tasksResponse.data.data);
      setUsers(usersResponse.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (formData) => {
    try {
      setSuccess('');
      if (editingTask) {
        await taskService.update(editingTask.id, formData);
        setSuccess('Task updated successfully');
      } else {
        await taskService.create(formData);
        setSuccess('Task created successfully');
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      setSuccess('');
      await taskService.updateStatus(taskId, newStatus);
      setSuccess('Task status updated successfully');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setSuccess('');
        await taskService.delete(taskId);
        setSuccess('Task deleted successfully');
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'in_progress':
        return 'badge-warning';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filterStatus);

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Task Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Create New Task
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="tasks-filter">
        <label>Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="tasks-table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  No tasks found
                </td>
              </tr>
            ) : (
              filteredTasks.map(task => (
                <tr key={task.id}>
                  <td className="task-title">{task.title}</td>
                  <td className="task-description">
                    {task.description?.substring(0, 50)}
                    {task.description && task.description.length > 50 ? '...' : ''}
                  </td>
                  <td>
                    <select
                      className={`status-select ${getStatusBadgeClass(task.status)}`}
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{task.assigned_to_username || 'Unassigned'}</td>
                  <td>{task.created_by_username}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-primary btn-sm"
                        onClick={() => handleOpenModal(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          users={users}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default TasksPage;
