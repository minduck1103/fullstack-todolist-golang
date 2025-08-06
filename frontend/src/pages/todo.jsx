import React from 'react';
import { taskAPI } from '../services/api';
import { UI_CONSTANTS } from '../utils/constants';

const TodoPage = () => {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Kiểm tra kết nối API
  React.useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await taskAPI.getAllTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
        console.error('Lỗi khi lấy danh sách tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Todo List - PR 1 Setup
      </h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Kiểm tra kết nối API</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">
                ✅ Backend API đã được kết nối thành công!
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-800">
                📊 Số lượng tasks hiện tại: <strong>{tasks.length}</strong>
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-800">
                🏗️ Cấu trúc dự án đã được setup:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                <li>API Service Layer</li>
                <li>Constants & Utilities</li>
                <li>Component Structure</li>
                <li>Custom Hooks Placeholder</li>
                <li>Type Definitions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
