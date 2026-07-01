import api from './api';

/**
 * Fetch tasks, optionally filtered/sorted/searched via query params.
 * @param {{search?: string, status?: string, sortBy?: string}} params
 */
export const fetchTasks = async (params = {}) => {
  const { data } = await api.get('/tasks', { params });
  return data.data;
};

export const createTask = async (payload) => {
  const { data } = await api.post('/tasks', payload);
  return data.data;
};

export const updateTask = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data.data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data.data;
};
