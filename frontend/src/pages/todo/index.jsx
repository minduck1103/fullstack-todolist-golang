import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Toast from '../../components/Toast';
import { useTasks } from '../../hooks/useTasks';

const TodoPage = () => {
  const [toast, setToast] = useState(null);
  
  const {
    tasks,
    loading,
    addingTask,
    error,
    fetchTasks,
    toggleComplete,
    deleteTask,
    addTask
  } = useTasks();

  // Hiển thị toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Xử lý thêm task với toast
  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      showToast('Thêm công việc thành công!', 'success');
    } catch (error) {
      showToast('Không thể thêm công việc. Vui lòng thử lại.', 'error');
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

        <div className="max-w-2xl mx-auto">
          <AddTodo 
            onAddTask={handleAddTask}
            loading={addingTask}
          />
          
          <div className="glass rounded-xl p-6">
            <TodoList
              tasks={tasks}
              loading={loading}
              error={error}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
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
