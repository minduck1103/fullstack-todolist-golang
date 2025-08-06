import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, AlertTriangle } from 'lucide-react';

const TodoItem = ({ 
  task, 
  onToggleComplete, 
  onDelete,
  loading = false 
}) => {
  const { id, title, description, completed, created_at } = task;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Xử lý toggle completion
  const handleToggleComplete = async () => {
    if (isToggling || loading) return;
    
    setIsToggling(true);
    try {
      await onToggleComplete(id, !completed);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    } finally {
      setIsToggling(false);
    }
  };

  // Xử lý xóa task
  const handleDelete = async () => {
    if (isDeleting || loading) return;
    
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Lỗi khi xóa task:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Format ngày tạo
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

    return (
    <div className={`bg-white rounded-lg border transition-all duration-300 hover:shadow-lg hover-lift ${
      completed
        ? 'border-green-200 bg-green-50 opacity-90'
        : 'border-gray-200 hover:border-purple-300'
    } ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="p-3 md:p-4">
        <div className="flex items-start space-x-2 md:space-x-3">
          {/* Nút checkbox */}
          <button
            onClick={handleToggleComplete}
            disabled={loading || isToggling}
            className={`flex-shrink-0 mt-1 p-2 rounded-full transition-all duration-200 ${
              loading || isToggling 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 hover:scale-110'
            }`}
          >
            {isToggling ? (
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            ) : completed ? (
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            ) : (
              <Circle className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-purple-500" />
            )}
          </button>

          {/* Nội dung */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-sm md:text-base font-medium transition-all duration-200 ${
                  completed 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-900'
                }`}>
                  {title}
                </h3>
                
                {description && (
                  <p className={`text-xs md:text-sm mt-2 transition-all duration-200 ${
                    completed 
                      ? 'text-gray-400 line-through' 
                      : 'text-gray-600'
                  }`}>
                    {description}
                  </p>
                )}
                
                {/* Thông tin ngày tạo */}
                {created_at && (
                  <div className="mt-2 text-xs text-gray-400 mobile-hidden">
                    Tạo lúc: {formatDate(created_at)}
                  </div>
                )}
              </div>
              
              {/* Badge trạng thái */}
              <div className="ml-3">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mobile-hidden ${
                  completed 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {completed ? 'Hoàn thành' : 'Đang làm'}
                </span>
              </div>
            </div>
          </div>

          {/* Nút xóa */}
          <div className="flex-shrink-0 ml-2">
            {showDeleteConfirm ? (
              // Confirmation dialog
              <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg p-2 animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-700">Xác nhận xóa?</span>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  {isDeleting ? 'Đang xóa...' : 'Xóa'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading || isDeleting}
                className={`p-2 text-gray-400 hover:text-red-500 rounded-full transition-all duration-200 ${
                  loading || isDeleting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-red-50 hover:scale-110'
                }`}
                title="Xóa công việc"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
