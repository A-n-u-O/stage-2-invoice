// src/components/InvoiceDetail.tsx
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import type { Invoice } from '../types/types';

interface InvoiceDetailProps {
  invoice: Invoice;
  onClose: () => void;
  onEdit: (invoice: Invoice) => void;
  onMarkPaid: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function InvoiceDetail({
  invoice,
  onClose,
  onEdit,
  onMarkPaid,
  onDelete,
}: InvoiceDetailProps) {
  const dueDate = format(new Date(invoice.paymentDue), 'dd MMM yyyy');
  const createdDate = format(new Date(invoice.createdAt), 'dd MMM yyyy');

  return (
    <div className="pb-24">
      {/* Top: Go Back Link */}
      <button
        onClick={onClose}
        className="flex items-center gap-4 text-gray-900 dark:text-white font-bold hover:text-gray-500 transition-colors mb-8"
      >
        <ChevronLeft size={16} className="text-violet-600" />
        <span className="mt-1">Go back</span>
      </button>

      {/* Status & Actions Header Card */}
      <div className="bg-white dark:bg-[#1e2139] rounded-xl flex items-center justify-between p-6 mb-6 shadow-sm">
        
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        {/* Right Side: Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {invoice.status !== 'paid' && (
            <button
              onClick={() => onEdit(invoice)}
              className="px-6 py-3 rounded-full bg-[#f9fafe] dark:bg-[#252945] hover:bg-gray-200 dark:hover:bg-white/10 font-bold transition-colors text-gray-900 dark:text-gray-200"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this invoice?')) onDelete(invoice.id);
            }}
            className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition-colors"
          >
            Delete
          </button>

          {invoice.status === 'pending' && (
            <button
              onClick={() => onMarkPaid(invoice.id)}
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold transition-colors"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* Main Invoice Document Container */}
      <div className="bg-white dark:bg-[#1e2139] rounded-xl p-6 md:p-12 shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between items-start mb-8 md:mb-5 gap-8 md:gap-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              <span className="text-[#7e88c3]">#</span>{invoice.id.replace('INV-', '')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.description}</p>
          </div>
          
          <div className="text-left md:text-right text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Invoice Date</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{createdDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Payment Due</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{dueDate}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Bill To</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">{invoice.clientName}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Sent to</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Items Table Container */}
        <div className="bg-[#f9fafe] dark:bg-[#252945] rounded-t-xl p-6 md:p-8">
          <div className="hidden md:grid grid-cols-5 gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="col-span-2">Item Name</div>
            <div className="text-center">QTY.</div>
            <div className="text-right">Price</div>
            <div className="text-right">Total</div>
          </div>

          <div className="space-y-6 md:space-y-4">
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                <div className="col-span-1 md:col-span-2 font-bold text-gray-900 dark:text-white">
                  <p>{item.name}</p>
                  <p className="md:hidden text-gray-500 dark:text-gray-400 mt-2">
                    {item.quantity} x £{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="hidden md:block text-center font-bold text-gray-500 dark:text-gray-400">
                  {item.quantity}
                </div>
                <div className="hidden md:block text-right font-bold text-gray-500 dark:text-gray-400">
                  £{item.price.toFixed(2)}
                </div>
                <div className="text-right font-bold text-gray-900 dark:text-white">
                  £{(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#373B53] dark:bg-[#0c0e16] text-white rounded-b-xl p-6 md:px-8 md:py-6 flex items-center justify-between">
          <span className="text-sm font-medium">Amount Due</span>
          <span className="text-2xl md:text-3xl font-bold">£{invoice.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Mobile Actions Bar (Pinned to bottom on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e2139] p-6 flex justify-center gap-2 shadow-[0_-10px_10px_rgba(0,0,0,0.05)]">
         {invoice.status !== 'paid' && (
          <button
            onClick={() => onEdit(invoice)}
            className="flex-1 py-4 rounded-full bg-[#f9fafe] dark:bg-[#252945] hover:bg-gray-200 font-bold transition-colors text-gray-900 dark:text-gray-200"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this invoice?')) onDelete(invoice.id);
          }}
          className="flex-1 py-4 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition-colors"
        >
          Delete
        </button>
        {invoice.status === 'pending' && (
          <button
            onClick={() => onMarkPaid(invoice.id)}
            className="flex-1 py-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold transition-colors"
          >
            Mark Paid
          </button>
        )}
      </div>
    </div>
  );
}