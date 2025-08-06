// Các hàm xác thực
export const validateTaskTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, message: 'Tiêu đề không được để trống' };
  }
  
  if (title.trim().length > 100) {
    return { isValid: false, message: 'Tiêu đề không được quá 100 ký tự' };
  }
  
  return { isValid: true, message: '' };
};

export const validateTaskDescription = (description) => {
  if (description && description.length > 500) {
    return { isValid: false, message: 'Mô tả không được quá 500 ký tự' };
  }
  
  return { isValid: true, message: '' };
};

// Các hàm xử lý ngày tháng
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Các hàm xử lý chuỗi
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Các hàm xử lý mảng
export const sortTasksByDate = (tasks, ascending = false) => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const filterTasksByStatus = (tasks, status) => {
  if (!status) return tasks;
  return tasks.filter(task => {
    if (status === 'completed') return task.completed;
    if (status === 'pending') return !task.completed;
    return true;
  });
};

// Các hàm xử lý lỗi
export const handleApiError = (error) => {
  if (error.response) {
    // Server phản hồi với trạng thái lỗi
    return error.response.data?.error || 'Lỗi server';
  } else if (error.request) {
    // Lỗi mạng
    return 'Lỗi kết nối mạng';
  } else {
    // Lỗi khác
    return error.message || 'Đã xảy ra lỗi không xác định';
  }
};

// Các hàm xử lý lưu trữ cục bộ
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Lỗi đọc từ localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Lỗi ghi vào localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Lỗi xóa từ localStorage:', error);
    }
  },
};

// Hàm debounce
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
