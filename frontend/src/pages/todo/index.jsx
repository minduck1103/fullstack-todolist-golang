import React, { useState, useEffect } from 'react';
import Toast from '../../components/Toast';
import ErrorBoundary from '../../components/ErrorBoundary';
import TodoHeader from './components/TodoHeader';
import TodoStats from './components/TodoStats';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TodoFooter from './components/TodoFooter';
import { taskAPI } from '../../services/api';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hiển thị toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Load tasks từ API khi component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks từ backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskAPI.getAllTasks();
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
      showToast('Không thể tải danh sách công việc', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thêm task
  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const taskData = {
        text: newTask.trim(),
        completed: false,
        createdAt: new Date()
      };
        
        const createdTask = await taskAPI.createTask(taskData);
        setTasks([createdTask, ...tasks]);
      setNewTask('');
      showToast('Thêm công việc thành công!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  // Xử lý toggle completion
  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const updatedTask = await taskAPI.updateTask(id, {
          completed: !task.completed
        });
        
        setTasks(tasks.map(t => 
          t.id === id ? updatedTask : t
    ));
    showToast('Đã cập nhật trạng thái công việc!', 'success');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Xử lý xóa task
  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
    showToast('Đã xóa công việc!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Xử lý chỉnh sửa task
  const handleStartEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = async () => {
    if (editingText.trim()) {
      try {
        const updatedTask = await taskAPI.updateTask(editingId, {
          text: editingText.trim()
        });
        
      setTasks(tasks.map(task => 
          task.id === editingId ? updatedTask : task
      ));
      showToast('Đã cập nhật công việc!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Calcula  te stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const inProgressTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Hiển thị loading hoặc error state
  if (loading) {
  return (
    <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4">
          <div className="max-w-4xl mx-auto">
            <TodoHeader />
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-emerald-700">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4">
          <div className="max-w-4xl mx-auto">
            <TodoHeader />
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">Không thể kết nối</h3>
              <p className="text-red-600 mb-4">{error}</p>
            <button
                onClick={loadTasks}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-medium transition-all duration-200"
            >
                Thử lại
            </button>
          </div>
        </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4">
        <div className="max-w-4xl mx-auto">
          <TodoHeader />
          
          <TodoStats 
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            inProgressTasks={inProgressTasks}
            completionRate={completionRate}
          />

          <AddTaskForm 
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
          />

          <TaskList 
            tasks={tasks}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            handleToggleTask={handleToggleTask}
            handleStartEdit={handleStartEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleDeleteTask={handleDeleteTask}
          />

          <TodoFooter />
        </div>

        {/*Thông báo*/}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default TodoPage;
