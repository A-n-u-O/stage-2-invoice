// src/components/InvoiceList.tsx
import type { Invoice } from '../types/types';
import InvoiceCard from './InvoiceCard';

interface InvoiceListProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
}

export default function InvoiceList({ invoices, onView }: InvoiceListProps) {
  return (
    <div className="flex flex-col gap-4 pb-32">
      {invoices.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          onView={onView}
        />
      ))}
    </div>
  );
}