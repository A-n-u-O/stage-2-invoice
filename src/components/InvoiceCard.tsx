// src/components/InvoiceCard.tsx
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import type { Invoice } from '../types/types';

interface InvoiceCardProps {
  invoice: Invoice;
  onView: (invoice: Invoice) => void;
}

export default function InvoiceCard({ invoice, onView }: InvoiceCardProps) {
  return (
    <div 
      onClick={() => onView(invoice)}
      className="bg-white dark:bg-[#1e2139] rounded-xl p-6 md:p-4 md:px-6 shadow-sm hover:border-violet-500 border border-transparent transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 group"
    >
      {/* Mobile Top Row / Desktop Left Side */}
      <div className="flex justify-between items-center md:flex-1 md:justify-start md:gap-10">
        <span className="font-bold text-gray-900 dark:text-white md:w-20">
          <span className="text-[#7e88c3]">#</span>{invoice.id.replace('INV-', '')}
        </span>
        
        <span className="text-gray-500 dark:text-gray-400 text-sm md:w-32 hidden md:block">
          Due {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
        </span>
        
        <span className="text-gray-500 dark:text-gray-400 text-sm md:flex-1 text-right md:text-left">
          {invoice.clientName}
        </span>
      </div>

      {/* Mobile Bottom Row / Desktop Right Side */}
      <div className="flex justify-between items-center md:gap-10">
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          <span className="text-gray-500 dark:text-gray-400 text-sm md:hidden mb-1">
            Due {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
          </span>
          <span className="text-xl md:text-lg font-bold">
            £{invoice.total.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <StatusBadge status={invoice.status} />
          <ChevronRight className="hidden md:block text-violet-600 transition-transform group-hover:translate-x-1" size={20} />
        </div>
      </div>
    </div>
  );
}