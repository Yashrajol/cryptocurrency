import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];
  
  const colorClass = {
    primary: 'border-primary-500',
    accent: 'border-accent-500',
    warning: 'border-warning-500',
    error: 'border-error-500',
  }[color as 'primary' | 'accent' | 'warning' | 'error'] || 'border-primary-500';

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClass} border-2 ${colorClass} border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;