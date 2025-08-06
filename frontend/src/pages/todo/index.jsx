import React, { useState } from 'react';
import Toast from '../../components/Toast';
import ErrorBoundary from '../../components/ErrorBoundary';
import TodoHeader from './components/TodoHeader';
import TodoStats from './components/TodoStats';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TodoFooter from './components/TodoFooter';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [toast, setToast] = useState(null);

  // Hiển thị toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Xử lý thêm task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      showToast('Thêm công việc thành công!', 'success');
    }
  };

  // Xử lý toggle completion
  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    showToast('Đã cập nhật trạng thái công việc!', 'success');
  };

  // Xử lý xóa task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showToast('Đã xóa công việc!', 'success');
  };

  // Xử lý chỉnh sửa task
  const handleStartEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      setTasks(tasks.map(task => 
        task.id === editingId ? { ...task, text: editingText.trim() } : task
      ));
      showToast('Đã cập nhật công việc!', 'success');
    }
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const inProgressTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
        
        {/* Toast Notification */}
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
