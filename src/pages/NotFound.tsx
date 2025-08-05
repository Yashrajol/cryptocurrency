import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-9xl font-bold text-slate-200 dark:text-slate-800">404</div>
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
      >
        <Home size={18} />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;