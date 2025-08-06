import axios from 'axios';

// Tạo instance axios với base URL
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
