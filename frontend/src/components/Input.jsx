import React from 'react';

const Input = ({ 
  value, 
  onChange, 
  placeholder = '', 
  className = '',
  onKeyDown,
  disabled = false,
  type = 'text'
}) => {
  const baseClasses = 'flex-1 border-0 bg-white/50 focus:bg-white transition-colors rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2';
  
  const classes = `${baseClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className={classes}
    />
  );
};

export default Input; 