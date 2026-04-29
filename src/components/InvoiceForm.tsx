// src/components/InvoiceForm.tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Invoice, InvoiceStatus } from '../types/types';

const invoiceSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Please enter a valid email'),
  paymentDue: z.string().min(1, 'Payment due date is required'),
  senderStreet: z.string().min(1, 'Street address is required'),
  senderCity: z.string().min(1, 'City is required'),
  senderPostCode: z.string().min(1, 'Post code is required'),
  senderCountry: z.string().min(1, 'Country is required'),
  clientStreet: z.string().min(1, 'Client street is required'),
  clientCity: z.string().min(1, 'Client city is required'),
  clientPostCode: z.string().min(1, 'Client post code is required'),
  clientCountry: z.string().min(1, 'Client country is required'),
  items: z.array(
    z.object({
      name: z.string().min(1, 'Item name is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      price: z.number().min(0.01, 'Price must be greater than 0'),
    })
  ).min(1, 'At least one item is required'),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  initialData?: Invoice | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function InvoiceForm({ initialData, onSave, onCancel }: InvoiceFormProps) {
  const isEditing = !!initialData;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
    watch,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: initialData
      ? {
        description: initialData.description,
        clientName: initialData.clientName,
        clientEmail: initialData.clientEmail,
        paymentDue: initialData.paymentDue.split('T')[0],
        senderStreet: initialData.senderAddress.street,
        senderCity: initialData.senderAddress.city,
        senderPostCode: initialData.senderAddress.postCode,
        senderCountry: initialData.senderAddress.country,
        clientStreet: initialData.clientAddress.street,
        clientCity: initialData.clientAddress.city,
        clientPostCode: initialData.clientAddress.postCode,
        clientCountry: initialData.clientAddress.country,
        items: initialData.items,
      }
      : {
        description: '',
        clientName: '',
        clientEmail: '',
        paymentDue: format(new Date(Date.now() + 30 * 86400000), 'yyyy-MM-dd'),
        senderStreet: '',
        senderCity: '',
        senderPostCode: '',
        senderCountry: '',
        clientStreet: '',
        clientCity: '',
        clientPostCode: '',
        clientCountry: '',
        items: [{ name: '', quantity: 1, price: 0 }],
      },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');

  // const calculateItemTotal = (qty: number, price: number) => (qty * price).toFixed(2);
  const grandTotal = items.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0);

  const onSubmit = (data: InvoiceFormData, status: InvoiceStatus) => {
    const formattedData = {
      description: data.description,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      paymentDue: new Date(data.paymentDue).toISOString(),
      status,
      senderAddress: {
        street: data.senderStreet,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
      clientAddress: {
        street: data.clientStreet,
        city: data.clientCity,
        postCode: data.clientPostCode,
        country: data.clientCountry,
      },
      items: data.items,
    };

    onSave(formattedData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e2139] rounded-xl shadow-xl p-6 md:p-10 max-h-[95vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8">
        {isEditing ? 'Edit Invoice' : 'New Invoice'}
      </h2>

      <form onSubmit={handleSubmit((data) => onSubmit(data, 'pending'))} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
        className="space-y-10">
        {/* Bill From */}
        <div>
          <h3 className="text-violet-600 dark:text-violet-400 font-medium mb-4">Bill From</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Street Address</label>
              <input {...register('senderStreet')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
              {errors.senderStreet && <p className="text-red-500 text-sm mt-1">{errors.senderStreet.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">City</label>
              <input {...register('senderCity')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
              {errors.senderCity && <p className="text-red-500 text-sm mt-1">{errors.senderCity.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Post Code</label>
              <input {...register('senderPostCode')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
              {errors.senderPostCode && <p className="text-red-500 text-sm mt-1">{errors.senderPostCode.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Country</label>
              <input {...register('senderCountry')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
              {errors.senderCountry && <p className="text-red-500 text-sm mt-1">{errors.senderCountry.message}</p>}
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div>
          <h3 className="text-violet-600 dark:text-violet-400 font-medium mb-4">Bill To</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Client's Name</label>
              <input {...register('clientName')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Client's Email</label>
              <input type="email" {...register('clientEmail')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
              {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Street Address</label>
                <input {...register('clientStreet')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
                {errors.clientStreet && <p className="text-red-500 text-sm mt-1">{errors.clientStreet.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">City</label>
                <input {...register('clientCity')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
                {errors.clientCity && <p className="text-red-500 text-sm mt-1">{errors.clientCity.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Post Code</label>
                <input {...register('clientPostCode')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
                {errors.clientPostCode && <p className="text-red-500 text-sm mt-1">{errors.clientPostCode.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Country</label>
                <input {...register('clientCountry')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
                {errors.clientCountry && <p className="text-red-500 text-sm mt-1">{errors.clientCountry.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Invoice Date</label>
                <div className="relative">
                  <input type="date" {...register('paymentDue')} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.paymentDue && <p className="text-red-500 text-sm mt-1">{errors.paymentDue.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Project Description</label>
                <input {...register('description')} placeholder="e.g. Website redesign" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500" />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div>
          <h3 className="text-lg font-medium mb-4">Item List</h3>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-12 md:col-span-5">
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Item Name</label>
                  <input
                    {...register(`items.${index}.name` as const)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500"
                  />
                  {errors.items?.[index]?.name && <p className="text-red-500 text-sm mt-1">{errors.items[index]?.name?.message}</p>}
                </div>

                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Qty</label>
                  <input
                    type="number"
                    {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="col-span-4 md:col-span-3">
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`items.${index}.price` as const, { valueAsNumber: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="col-span-5 md:col-span-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    disabled={fields.length === 1}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="col-span-7 md:col-span-1 text-right text-sm text-gray-500 dark:text-gray-400">
                  {(items[index]?.quantity * items[index]?.price || 0).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {errors.items && typeof errors.items.message === 'string' && (
            <p className="text-red-500 text-sm mt-2">{errors.items.message}</p>
          )}

          <button
            type="button"
            onClick={() => append({ name: '', quantity: 1, price: 0 })}
            className="mt-6 flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium"
          >
            <Plus size={18} /> Add New Item
          </button>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center py-4 border-t border-gray-200 dark:border-gray-700 text-lg font-semibold">
          <span>Grand Total</span>
          <span>£{grandTotal.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition-colors"
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, 'draft'))}
            className="flex-1 py-3 px-6 rounded-full bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500 text-white font-medium transition-colors"
          >
            Save as Draft
          </button>

          <button
            type="submit"
            className="flex-1 py-3 px-6 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all active:scale-95"
          >
            Save & Send
          </button>
        </div>
      </form>
    </div>
  );
}