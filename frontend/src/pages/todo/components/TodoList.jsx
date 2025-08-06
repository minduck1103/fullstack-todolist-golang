import React from 'react';
import TodoItem from './TodoItem';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';

const TodoList = ({ 
  tasks = [], 
  loading = false, 
  error = null,
  onToggleComplete,
  onDelete,
  onRetry 
}) => {
  // Hiển thị trạng thái đang tải với skeleton
  if (loading && tasks.length === 0) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton type="task" count={3} />
      </div>
    );
  }

  // Hiển thị trạng thái lỗi
  if (error && tasks.length === 0) {
    return (
      <ErrorState 
        message={error}
        onRetry={onRetry}
      />
    );
  }

  // Hiển thị trạng thái trống
  if (!loading && !error && tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {/* Phần đầu với số lượng công việc */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Danh sách công việc
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {tasks.length} {tasks.length === 1 ? 'công việc' : 'công việc'}
        </span>
      </div>

      {/* Lớp phủ loading cho danh sách có sẵn */}
      {loading && tasks.length > 0 && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <LoadingSpinner size="md" text="Đang cập nhật..." />
        </div>
      )}

      {/* Danh sách các công việc */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            loading={loading}
          />
        ))}
      </div>

      {/* Thông báo khi có lỗi nhưng vẫn có công việc */}
      {error && tasks.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Thử lại
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
