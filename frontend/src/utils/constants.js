// Cấu hình API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  TIMEOUT: 10000,
};

// Trạng thái Task
export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

// Hằng số giao diện
export const UI_CONSTANTS = {
  // Trạng thái loading
  LOADING: 'loading',
  IDLE: 'idle',
  ERROR: 'error',
  SUCCESS: 'success',

  // Xác thực form
  MIN_TITLE_LENGTH: 1,
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,

  // Thời gian animation
  ANIMATION_DURATION: 300,
  TRANSITION_DURATION: 200,
};

// Thông báo lỗi
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  SERVER_ERROR: 'Lỗi server',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định',
  
  // Lỗi cụ thể cho task
  TASK_NOT_FOUND: 'Không tìm thấy task',
  TASK_CREATE_FAILED: 'Không thể tạo task',
  TASK_UPDATE_FAILED: 'Không thể cập nhật task',
  TASK_DELETE_FAILED: 'Không thể xóa task',
};

// Thông báo thành công
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task đã được tạo thành công',
  TASK_UPDATED: 'Task đã được cập nhật thành công',
  TASK_DELETED: 'Task đã được xóa thành công',
};

// Khóa lưu trữ cục bộ
export const STORAGE_KEYS = {
  THEME: 'todo-theme',
  USER_PREFERENCES: 'todo-preferences',
};
