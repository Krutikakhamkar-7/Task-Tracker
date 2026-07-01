import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as taskService from '../services/taskService';

/**
 * Central hook that owns all task state and CRUD operations, plus
 * search/filter/sort query params. Keeps components declarative.
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.fetchTasks({
        search: search || undefined,
        status: statusFilter,
        sortBy,
      });
      setTasks(data);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load tasks';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sortBy]);

  useEffect(() => {
    const timeout = setTimeout(loadTasks, 300); // debounce search typing
    return () => clearTimeout(timeout);
  }, [loadTasks]);

  const addTask = async (payload) => {
    const newTask = await taskService.createTask(payload);
    setTasks((prev) => [newTask, ...prev]);
    toast.success('Task created successfully');
    return newTask;
  };

  const editTask = async (id, payload) => {
    const updated = await taskService.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    toast.success('Task updated successfully');
    return updated;
  };

  const removeTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    toast.success('Task deleted');
  };

  return {
    tasks,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    addTask,
    editTask,
    removeTask,
    refetch: loadTasks,
  };
};

export default useTasks;
