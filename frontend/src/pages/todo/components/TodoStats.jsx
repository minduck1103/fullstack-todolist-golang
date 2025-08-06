import React from 'react';
import { CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const TodoStats = ({ tasks = [], optimisticUpdates = new Map(), lastAction }) => {
  // Tính toán thống kê
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Đếm optimistic updates
  const optimisticCount = optimisticUpdates.size;
  
  // Format thời gian từ last action
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) return `${seconds}s trước`;
    if (minutes < 60) return `${minutes}m trước`;
    return `${Math.floor(minutes / 60)}h trước`;
  };

  const getActionText = (action) => {
    if (!action) return '';
    
    switch (action.type) {
      case 'add':
        return `Đã thêm: "${action.task.title}"`;
      case 'toggle':
        return `Đã ${action.task.completed ? 'hoàn thành' : 'bỏ hoàn thành'}: "${action.task.title}"`;
      case 'delete':
        return 'Đã xóa một công việc';
      default:
        return '';
    }
  };

  return (
    <div className="mb-6 animate-slide-down">
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mobile-text-center">Tổng cộng</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg hover-scale">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mobile-text-center">Hoàn thành</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg hover-scale">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mobile-text-center">Đang làm</p>
              <p className="text-xl md:text-2xl font-bold text-yellow-600">{pendingTasks}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg hover-scale">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mobile-text-center">Tỷ lệ hoàn thành</p>
              <p className="text-xl md:text-2xl font-bold text-purple-600">{completionRate}%</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg hover-scale">
              <div className="w-4 h-4 md:w-5 md:h-5 text-purple-600 text-center text-xs font-bold">
                {completionRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

             {/* Trạng thái cập nhật */}
       <div className="flex flex-wrap gap-3 items-center">
         {/* Optimistic updates indicator */}
         {optimisticCount > 0 && (
           <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
             <span className="text-sm text-blue-700 font-medium">
               Đang cập nhật... ({optimisticCount})
             </span>
           </div>
         )}

         {/* Last action */}
         {lastAction && (
           <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
             <CheckCircle className="w-4 h-4 text-green-600" />
             <span className="text-sm text-green-700">
               {getActionText(lastAction)}
             </span>
             <span className="text-xs text-green-500">
               {formatTimeAgo(lastAction.timestamp)}
             </span>
           </div>
         )}

         {/* Progress bar */}
         {totalTasks > 0 && (
           <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
             <div 
               className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500 ease-out"
               style={{ width: `${completionRate}%` }}
             ></div>
           </div>
         )}
       </div>

      {/* Thông báo trạng thái */}
      {totalTasks === 0 && !optimisticCount && (
        <div className="text-center py-4 text-gray-500">
          <p>Chưa có công việc nào. Hãy thêm công việc đầu tiên!</p>
        </div>
      )}

      {completedTasks === totalTasks && totalTasks > 0 && (
        <div className="text-center py-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-green-700 font-medium">Tuyệt vời! Tất cả công việc đã hoàn thành!</p>
        </div>
      )}
    </div>
  );
};

export default TodoStats;
