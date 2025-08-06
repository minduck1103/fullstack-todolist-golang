import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';
import { UI_CONSTANTS } from '../utils/constants';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy danh sách công việc từ API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await taskAPI.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi lấy danh sách công việc:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật trạng thái hoàn thành của công việc
  const toggleComplete = useCallback(async (taskId, completed) => {
    try {
      const updatedTask = await taskAPI.updateTask(taskId, { completed });
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi cập nhật công việc:', err);
    }
  }, []);

  // Xóa công việc
  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      
      setTasks(prevTasks => 
        prevTasks.filter(task => task.id !== taskId)
      );
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi xóa công việc:', err);
    }
  }, []);

  // Thêm công việc mới 
  const addTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      
      setTasks(prevTasks => [...prevTasks, newTask]);
      
      return newTask;
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi tạo công việc:', err);
      throw err;
    }
  }, []);

  // Lấy danh sách công việc khi component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    toggleComplete,
    deleteTask,
    addTask,
    clearError: () => setError(null)
  };
};
