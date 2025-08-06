import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useTasks } from '../../hooks/useTasks';

const TodoPage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Phần đầu trang */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            Quản lý công việc của bạn một cách hiệu quả
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="max-w-2xl mx-auto">
          {/* Component thêm task mới */}
          <AddTodo 
            onAddTask={addTask}
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

        {/* Thông tin cuối trang */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>PR 3: AddTodo Component - Thêm công việc mới</p>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
