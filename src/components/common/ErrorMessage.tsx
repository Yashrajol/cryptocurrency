import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  retry, 
  className = '' 
}) => {
  return (
    <div className={`bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-300 p-4 rounded-md ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle size={20} className="text-error-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-2 text-sm font-medium underline text-error-600 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;