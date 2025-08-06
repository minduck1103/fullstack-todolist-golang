import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoStats from './components/TodoStats';
import Toast from '../../components/Toast';
import { useTasks } from '../../hooks/useTasks';

const TodoPage = () => {
  const [toast, setToast] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  
  const {
    tasks,
    loading,
    addingTask,
    error,
    optimisticUpdates,
    fetchTasks,
    toggleComplete,
    deleteTask,
    addTask
  } = useTasks();

  // Hiển thị toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Xử lý thêm task với toast và tracking
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setLastAction({ type: 'add', task: newTask, timestamp: Date.now() });
      showToast('Thêm công việc thành công!', 'success');
    } catch (error) {
      showToast('Không thể thêm công việc. Vui lòng thử lại.', 'error');
    }
  };

  // Xử lý toggle completion với toast
  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await toggleComplete(taskId, completed);
      setLastAction({ type: 'toggle', task: updatedTask, timestamp: Date.now() });
      showToast(
        completed ? 'Đánh dấu hoàn thành!' : 'Đã bỏ đánh dấu hoàn thành!', 
        'success'
      );
    } catch (error) {
      showToast('Không thể cập nhật trạng thái. Vui lòng thử lại.', 'error');
    }
  };

  // Xử lý xóa task với toast
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setLastAction({ type: 'delete', taskId, timestamp: Date.now() });
      showToast('Đã xóa công việc!', 'success');
    } catch (error) {
      showToast('Không thể xóa công việc. Vui lòng thử lại.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            Quản lý công việc của bạn một cách hiệu quả
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Component thống kê */}
          <TodoStats 
            tasks={tasks}
            optimisticUpdates={optimisticUpdates}
            lastAction={lastAction}
          />
          
          {/* Component thêm task mới */}
          <AddTodo 
            onAddTask={handleAddTask}
            loading={addingTask}
          />
          
          <div className="glass rounded-xl p-6">
            <TodoList
              tasks={tasks}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onRetry={fetchTasks}
            />
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default TodoPage;
