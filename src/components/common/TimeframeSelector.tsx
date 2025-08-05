import React from 'react';

interface TimeOption {
  value: number;
  label: string;
}

interface TimeframeSelectorProps {
  options: TimeOption[];
  selected: number;
  onChange: (days: number) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  options, 
  selected, 
  onChange 
}) => {
  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 text-xs md:text-sm rounded-md transition-colors ${
            selected === option.value
              ? 'bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 font-medium'
              : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;