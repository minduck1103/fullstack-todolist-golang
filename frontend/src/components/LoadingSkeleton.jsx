import React from 'react';

const LoadingSkeleton = ({ type = 'task', count = 3 }) => {
  // Skeleton cho task item
  const TaskSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-start space-x-3">
        {/* Checkbox skeleton */}
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
        
        {/* Content skeleton */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title skeleton */}
              <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
              {/* Description skeleton */}
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              {/* Date skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            {/* Status badge skeleton */}
            <div className="ml-3">
              <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Delete button skeleton */}
        <div className="flex-shrink-0 ml-2">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Skeleton cho stats cards
  const StatsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="p-2 bg-gray-200 rounded-lg w-9 h-9"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Skeleton cho form
  const FormSkeleton = () => (
    <div className="glass rounded-lg p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="flex space-x-3">
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
          <div className="h-10 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  // Render skeleton dựa trên type
  switch (type) {
    case 'task':
      return (
        <div className="space-y-4">
          {[...Array(count)].map((_, index) => (
            <TaskSkeleton key={index} />
          ))}
        </div>
      );
    case 'stats':
      return <StatsSkeleton />;
    case 'form':
      return <FormSkeleton />;
    default:
      return <TaskSkeleton />;
  }
};

export default LoadingSkeleton;
