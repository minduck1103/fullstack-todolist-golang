import React from 'react';
import { CheckSquare } from 'lucide-react';

const EmptyState = ({ 
  title = 'Chưa có công việc nào', 
  description = 'Hãy tạo công việc đầu tiên để bắt đầu quản lý danh sách của bạn',
  icon: Icon = CheckSquare 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
