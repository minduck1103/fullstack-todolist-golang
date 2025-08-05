import React from 'react';

const Checkbox = ({ 
  checked, 
  onCheckedChange, 
  className = '',
  disabled = false 
}) => {
  const baseClasses = 'w-4 h-4 rounded border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2';
  
  const checkedClasses = checked 
    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-transparent' 
    : 'border-gray-300 hover:border-gray-400';
  
  const classes = `${baseClasses} ${checkedClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      disabled={disabled}
      className={classes}
    />
  );
};

export default Checkbox; 