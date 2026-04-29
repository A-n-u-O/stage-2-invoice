import { useState, useEffect } from 'react';
import type { Invoice, InvoiceStatus } from '../types/types';

const STORAGE_KEY = 'invoices';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'createdAt' | 'total'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: 'INV-' + Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
      total: invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    };
    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id
          ? { ...inv, ...updates, total: updates.items ? updates.items.reduce((sum, item) => sum + item.quantity * item.price, 0) : inv.total }
          : inv
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const markAsPaid = (id: string) => {
    updateInvoice(id, { status: 'paid' });
  };

  const filteredInvoices = (filter: InvoiceStatus | 'all') => {
    if (filter === 'all') return invoices;
    return invoices.filter(inv => inv.status === filter);
  };

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
    filteredInvoices,
  };
}