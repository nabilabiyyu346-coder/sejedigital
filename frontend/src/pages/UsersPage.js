import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import UserModal from '../components/UserModal';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/users');
      setUsers(res.data.users);
    } catch (err) {
      alert('Error fetching users');
    }
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete user?')) {
      try {
        await apiClient.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Users</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>Create User</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>
                <button className="btn btn-sm btn-info" onClick={() => openModal(user)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal show={showModal} onClose={closeModal} user={selectedUser} onSave={handleSave} />
    </div>
  );
};

export default UsersPage;