import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

const AddTodo = ({ onAddTask, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Tiêu đề phải có ít nhất 3 ký tự';
    }
    
    if (formData.description.trim().length > 500) {
      newErrors.description = 'Mô tả không được quá 500 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onAddTask({
        title: formData.title.trim(),
        description: formData.description.trim()
      });
      
      // Reset form sau khi thêm thành công
      setFormData({
        title: '',
        description: ''
      });
      setErrors({});
      setIsExpanded(false);
    } catch (error) {
      // Lỗi sẽ được xử lý bởi parent component
      console.error('Lỗi khi thêm task:', error);
    }
  };

  // Xử lý cancel
  const handleCancel = () => {
    setFormData({
      title: '',
      description: ''
    });
    setErrors({});
    setIsExpanded(false);
  };

  // Xử lý expand/collapse form
  const handleToggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="mb-6">
      {!isExpanded ? (
        // Nút mở form
        <button
          onClick={handleToggleExpand}
          className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
          disabled={loading}
        >
          <div className="flex items-center justify-center space-x-2 text-purple-600">
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Thêm công việc mới</span>
          </div>
        </button>
      ) : (
        // Form thêm task
        <div className="glass rounded-lg p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Thêm công việc mới
            </h3>
            <button
              onClick={handleCancel}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input tiêu đề */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus-ring ${
                  errors.title 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="Nhập tiêu đề công việc..."
                disabled={loading}
                autoFocus
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Input mô tả */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả <span className="text-gray-400">(tùy chọn)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus-ring resize-none ${
                  errors.description 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="Nhập mô tả chi tiết (tùy chọn)..."
                disabled={loading}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">
                  {errors.description}
                </p>
              )}
              <div className="mt-1 text-xs text-gray-500 text-right">
                {formData.description.length}/500
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading || !formData.title.trim()}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  loading || !formData.title.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang thêm...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Thêm công việc</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
