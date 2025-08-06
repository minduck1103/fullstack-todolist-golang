import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const TodoItem = ({ 
  task, 
  onToggleComplete, 
  onDelete,
  loading = false 
}) => {
  const { id, title, description, completed } = task;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:shadow-md ${
      completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-3">
        {/* Nút checkbox */}
        <button
          onClick={() => onToggleComplete(id, !completed)}
          disabled={loading}
          className={`flex-shrink-0 mt-1 p-1 rounded-full transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
        >
          {completed ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {/* Nội dung */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium ${
            completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-900'
          }`}>
            {title}
          </h3>
          
          {description && (
            <p className={`text-sm mt-1 ${
              completed 
                ? 'text-gray-400 line-through' 
                : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}
        </div>

        {/* Nút xóa */}
        <button
          onClick={() => onDelete(id)}
          disabled={loading}
          className={`flex-shrink-0 p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
