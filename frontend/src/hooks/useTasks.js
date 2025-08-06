import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';
import { UI_CONSTANTS } from '../utils/constants';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [error, setError] = useState(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState(new Map());

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

  // Cập nhật trạng thái hoàn thành của công việc với optimistic update
  const toggleComplete = useCallback(async (taskId, completed) => {
    // Optimistic update - cập nhật UI ngay lập tức
    const originalTasks = [...tasks];
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
    
    // Đánh dấu optimistic update
    setOptimisticUpdates(prev => new Map(prev.set(taskId, { type: 'toggle', original: originalTasks.find(t => t.id === taskId) })));
    
    try {
      const updatedTask = await taskAPI.updateTask(taskId, { completed });
      
      // Cập nhật với dữ liệu thật từ server
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );
      
      // Xóa optimistic update
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
      
      return updatedTask;
    } catch (err) {
      // Rollback nếu có lỗi
      setTasks(originalTasks);
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
      
      setError(err.message);
      console.error('Lỗi khi cập nhật công việc:', err);
      throw err;
    }
  }, [tasks]);

  // Xóa công việc với optimistic update
  const deleteTask = useCallback(async (taskId) => {
    // Optimistic update - xóa khỏi UI ngay lập tức
    const originalTasks = [...tasks];
    const deletedTask = tasks.find(task => task.id === taskId);
    
    setTasks(prevTasks => 
      prevTasks.filter(task => task.id !== taskId)
    );
    
    // Đánh dấu optimistic update
    setOptimisticUpdates(prev => new Map(prev.set(taskId, { type: 'delete', original: deletedTask })));
    
    try {
      await taskAPI.deleteTask(taskId);
      
      // Xóa optimistic update
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
      
      return true;
    } catch (err) {
      // Rollback nếu có lỗi
      setTasks(originalTasks);
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
      
      setError(err.message);
      console.error('Lỗi khi xóa công việc:', err);
      throw err;
    }
  }, [tasks]);

  // Thêm công việc mới với optimistic update
  const addTask = useCallback(async (taskData) => {
    setAddingTask(true);
    setError(null);
    
    // Tạo temporary task với ID tạm thời
    const tempId = `temp_${Date.now()}`;
    const tempTask = {
      id: tempId,
      title: taskData.title,
      description: taskData.description,
      completed: false,
      created_at: new Date().toISOString(),
      isOptimistic: true
    };
    
    // Optimistic update - thêm vào UI ngay lập tức
    setTasks(prevTasks => [...prevTasks, tempTask]);
    
    // Đánh dấu optimistic update
    setOptimisticUpdates(prev => new Map(prev.set(tempId, { type: 'add', original: null })));
    
    try {
      const newTask = await taskAPI.createTask(taskData);
      
      // Thay thế task tạm bằng task thật từ server
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === tempId ? newTask : task
        )
      );
      
      // Xóa optimistic update
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(tempId);
        return newMap;
      });
      
      return newTask;
    } catch (err) {
      // Rollback nếu có lỗi
      setTasks(prevTasks => 
        prevTasks.filter(task => task.id !== tempId)
      );
      
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(tempId);
        return newMap;
      });
      
      setError(err.message);
      console.error('Lỗi khi tạo công việc:', err);
      throw err;
    } finally {
      setAddingTask(false);
    }
  }, []);

  // Lấy danh sách công việc khi component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    addingTask,
    error,
    optimisticUpdates,
    fetchTasks,
    toggleComplete,
    deleteTask,
    addTask,
    clearError: () => setError(null)
  };
};
