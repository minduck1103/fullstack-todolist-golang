import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X, AlertCircle } from 'lucide-react';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`fixed top-4 right-2 md:right-4 z-50 max-w-xs md:max-w-sm w-full animate-slide-up`}>
      <div className={`flex items-center p-3 md:p-4 rounded-lg border shadow-lg ${getStyles()}`}>
        <div className="flex-shrink-0 mr-2 md:mr-3">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <p className="text-xs md:text-sm font-medium">
            {message}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 md:ml-3 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors hover-scale"
        >
          <X className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
