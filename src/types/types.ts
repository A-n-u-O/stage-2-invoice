export type InvoiceStatus = 'draft' | 'pending' | 'paid';

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: InvoiceItem[];
  total: number;
}