import apiClient from './apiClient';

export const authService = {
  register: (credentials) => {
    return apiClient.post('/auth/register', credentials);
  },

  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const userService = {
  getAll: () => {
    return apiClient.get('/users');
  },

  getById: (id) => {
    return apiClient.get(`/users/${id}`);
  },

  create: (userData) => {
    return apiClient.post('/users', userData);
  },

  update: (id, userData) => {
    return apiClient.put(`/users/${id}`, userData);
  },

  delete: (id) => {
    return apiClient.delete(`/users/${id}`);
  }
};

export const taskService = {
  getAll: () => {
    return apiClient.get('/tasks');
  },

  getById: (id) => {
    return apiClient.get(`/tasks/${id}`);
  },

  create: (taskData) => {
    return apiClient.post('/tasks', taskData);
  },

  update: (id, taskData) => {
    return apiClient.put(`/tasks/${id}`, taskData);
  },

  updateStatus: (id, status) => {
    return apiClient.patch(`/tasks/${id}/status`, { status });
  },

  delete: (id) => {
    return apiClient.delete(`/tasks/${id}`);
  }
};
