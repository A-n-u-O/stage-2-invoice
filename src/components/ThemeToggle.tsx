// src/components/ThemeToggle.tsx  (Enhanced Version)

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className="p-3 rounded-2xl bg-white dark:bg-[#1e2139] border border-gray-200 dark:border-gray-700 
                   hover:border-violet-400 dark:hover:border-violet-500 
                   transition-all duration-200 active:scale-95 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 
                   dark:focus:ring-offset-[#141625]"
      >
        <div className="relative w-5 h-5">
          <Sun 
            size={20} 
            className={`absolute inset-0 text-yellow-500 transition-all duration-300 
              ${theme === 'light' ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} 
          />
          <Moon 
            size={20} 
            className={`absolute inset-0 text-gray-700 dark:text-gray-300 transition-all duration-300 
              ${theme === 'dark' ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} 
          />
        </div>
      </button>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </div>
    </div>
  );
}