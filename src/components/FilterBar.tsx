// src/components/FilterBar.tsx

import type { InvoiceStatus } from "../types/types";

const filters: Array<{ label: string; value: 'all' | InvoiceStatus }> = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
];

interface FilterBarProps {
  currentFilter: 'all' | InvoiceStatus;
  onFilterChange: (filter: 'all' | InvoiceStatus) => void;
}

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex bg-white dark:bg-[#1e2139] rounded-xl p-1 border border-gray-200 dark:border-gray-700">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
            currentFilter === filter.value
              ? 'bg-violet-600 text-white shadow-sm'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}