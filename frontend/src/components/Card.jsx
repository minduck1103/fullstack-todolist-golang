import React from 'react';

const Card = ({ children, className = '', variant = 'default' }) => {
  const baseClasses = 'bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg';
  
  const variants = {
    default: 'bg-white/80',
    glass: 'bg-white/70 backdrop-blur-sm',
    stats: 'bg-white/70 backdrop-blur-sm'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${className}`}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card; 