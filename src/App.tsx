// src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useInvoices } from './hooks/useInvoices';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';
import Drawer from './components/Drawer';
import FilterDropdown from './components/FilterDropdown'; // <-- New import
import emptyIllustration from './assets/email-campaign.png'; // Ensure image is imported correctly
import type { Invoice, InvoiceStatus } from './types/types';
import Sidebar from './components/SideBar';

function App() {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, markAsPaid } = useInvoices();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  
  // Update state to handle an Array of filters (so users can check multiple)
  const [activeFilters, setActiveFilters] = useState<InvoiceStatus[]>([]);

  // Filter logic: if array is empty, show all. Otherwise, check if status is in the array.
  const displayedInvoices = activeFilters.length === 0 
    ? invoices 
    : invoices.filter(inv => activeFilters.includes(inv.status));
  
  const currentViewedInvoice = selectedInvoiceId 
    ? invoices.find(inv => inv.id === selectedInvoiceId) || null 
    : null;

  const handleSaveInvoice = (data: any) => {
    if (editingInvoice) {
      updateInvoice(editingInvoice.id, data);
    } else {
      addInvoice(data);
    }
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  const handleEdit = (invoice: Invoice) => {
    if (invoice.status === 'paid') return;
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#f8f8fb] dark:bg-[#141625] text-gray-900 dark:text-white transition-colors overflow-x-hidden">
        
        <Sidebar />

        <main className="flex-1 max-w-3xl mx-auto px-6 py-8 md:py-16 w-full lg:max-w-4xl">
          {!currentViewedInvoice ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-14">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Invoices</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm md:text-base">
                    <span className="hidden md:inline">There are </span>
                    {displayedInvoices.length} total invoices
                  </p>
                </div>

                <div className="flex items-center gap-4 md:gap-10">
                  {/* Our new Dropdown component */}
                  <FilterDropdown filters={activeFilters} setFilters={setActiveFilters} />

                  <button
                    onClick={() => {
                      setEditingInvoice(null);
                      setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white p-2 md:pr-4 md:pl-2 rounded-full font-medium transition-all active:scale-95"
                  >
                    <div className="bg-white text-violet-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-xl font-bold pb-1">+</span>
                    </div>
                    <span className="hidden md:inline">New Invoice</span>
                    <span className="md:hidden pr-2">New</span>
                  </button>
                </div>
              </div>

              {displayedInvoices.length > 0 ? (
                // Only passing what the cleaned card needs
                <InvoiceList
                  invoices={displayedInvoices}
                  onView={(inv) => setSelectedInvoiceId(inv.id)}
                />
              ) : (
                <div className="text-center mt-24 max-w-sm mx-auto">
                  <div className="mx-auto w-64 h-64 mb-8 flex items-center justify-center">
                     <img src={emptyIllustration} alt="No Invoices" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">There is nothing here</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Create an invoice by clicking the <br/>
                    <span className="font-bold">New Invoice</span> button and get started
                  </p>
                </div>
              )}
            </>
          ) : (
            <InvoiceDetail
              invoice={currentViewedInvoice}
              onClose={() => setSelectedInvoiceId(null)}
              onEdit={handleEdit}
              onMarkPaid={markAsPaid}
              onDelete={(id) => {
                deleteInvoice(id);
                setSelectedInvoiceId(null);
              }}
            />
          )}
        </main>

        <Drawer isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); setEditingInvoice(null); }}>
          <InvoiceForm
            initialData={editingInvoice}
            onSave={handleSaveInvoice}
            onCancel={() => { setIsFormOpen(false); setEditingInvoice(null); }}
          />
        </Drawer>
      </div>
    </ThemeProvider>
  );
}

export default App;