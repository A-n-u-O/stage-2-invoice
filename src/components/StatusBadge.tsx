// src/components/StatusBadge.tsx

import type { InvoiceStatus } from "../types/types";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    draft: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
    pending: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
    paid: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
  };

  const labels = {
    draft: 'Draft',
    pending: 'Pending',
    paid: 'Paid',
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium capitalize ${styles[status]}`}>
      ● {labels[status]}
    </span>
  );
}