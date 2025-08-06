import axios from 'axios';

// Lấy biến môi trường từ Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;
const ENV = import.meta.env.VITE_ENV || 'development';

// Tạo instance axios với base URL từ environment
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log configuration in development
if (ENV === 'development') {
  console.log('API Configuration:', {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    environment: ENV
  });
}

// Các endpoint API
export const API_ENDPOINTS = {
  TASKS: '/tasks',
  HEALTH: '/health',
};

// Các hàm API cho task
export const taskAPI = {
  // Lấy tất cả tasks
  getAllTasks: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.TASKS);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể lấy danh sách tasks');
    }
  },

  // Tạo task mới
  createTask: async (taskData) => {
    try {
      const response = await api.post(API_ENDPOINTS.TASKS, {
        text: taskData.text
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tạo task');
    }
  },

  // Cập nhật task
  updateTask: async (id, updateData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.TASKS}/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể cập nhật task');
    }
  },

  // Xóa task
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.TASKS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể xóa task');
    }
  },
};

// Kiểm tra trạng thái backend
export const healthAPI = {
  checkHealth: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      throw new Error('Backend không khả dụng');
    }
  },
};

export default api;
