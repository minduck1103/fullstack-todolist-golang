import React from 'react';
import { TrendingUp, Check, Clock } from 'lucide-react';

const TodoStats = ({ totalTasks, completedTasks, inProgressTasks, completionRate }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-600 text-sm font-medium">Tổng công việc</p>
            <p className="text-3xl font-bold text-emerald-800">{totalTasks}</p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-xl">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Hoàn thành</p>
            <p className="text-3xl font-bold text-green-800">{completedTasks}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-xl">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-600 text-sm font-medium">Đang làm</p>
            <p className="text-3xl font-bold text-amber-800">{inProgressTasks}</p>
          </div>
          <div className="p-3 bg-amber-100 rounded-xl">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Tỷ lệ hoàn thành</p>
            <p className="text-3xl font-bold text-blue-800">{completionRate}%</p>
          </div>
          <div className="relative w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(219 234 254)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(37 99 235)"
                strokeWidth="3"
                strokeDasharray={`${completionRate}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
