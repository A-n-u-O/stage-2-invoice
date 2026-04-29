// src/components/FilterDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { InvoiceStatus } from '../types/types';

interface FilterDropdownProps {
  filters: InvoiceStatus[];
  setFilters: React.Dispatch<React.SetStateAction<InvoiceStatus[]>>;
}

export default function FilterDropdown({ filters, setFilters }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (status: InvoiceStatus) => {
    if (filters.includes(status)) {
      setFilters(filters.filter(f => f !== status)); // Remove if checked
    } else {
      setFilters([...filters, status]); // Add if unchecked
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span>Filter <span className="hidden md:inline">by status</span></span>
        <ChevronDown size={14} className={`text-violet-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* The Dropdown Menu */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:-left-6 w-48 bg-white dark:bg-[#252945] rounded-xl shadow-2xl p-6 z-50 transition-all duration-200 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        {['draft', 'pending', 'paid'].map((status) => (
          <label key={status} className="flex items-center gap-4 mb-4 last:mb-0 cursor-pointer group">
            <div className={`relative flex items-center justify-center w-4 h-4 rounded border transition-colors ${
                filters.includes(status as InvoiceStatus) 
                ? 'bg-violet-600 border-violet-600' 
                : 'bg-gray-200 dark:bg-[#1e2139] border-transparent group-hover:border-violet-600'
              }`}
            >
              <input
                type="checkbox"
                className="opacity-0 absolute w-full h-full cursor-pointer"
                checked={filters.includes(status as InvoiceStatus)}
                onChange={() => toggleFilter(status as InvoiceStatus)}
              />
              {filters.includes(status as InvoiceStatus) && <Check size={12} className="text-white absolute" strokeWidth={4} />}
            </div>
            <span className="text-sm font-bold capitalize">{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
}