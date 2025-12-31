'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { Category, Transaction } from '@/types';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  transaction?: Transaction | null;
}

export function TransactionForm({ isOpen, onClose, onSubmit, transaction }: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (transaction) {
        setFormData({
          type: transaction.type,
          amount: transaction.amount.toString(),
          description: transaction.description,
          categoryId: transaction.categoryId || '',
          date: new Date(transaction.date).toISOString().split('T')[0],
        });
      } else {
        setFormData({
          type: 'expense',
          amount: '',
          description: '',
          categoryId: '',
          date: new Date().toISOString().split('T')[0],
        });
      }
    }
  }, [isOpen, transaction]);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data.categories || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = transaction
        ? `/api/transactions/${transaction.id}`
        : '/api/transactions';
      const method = transaction ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to save transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) => cat.type === formData.type);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={transaction ? 'Edit Transaction' : 'Add Transaction'}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', categoryId: '' })}
              className={`flex-1 py-3 rounded-lg font-medium border-2 ${
                formData.type === 'income'
                  ? 'bg-green-50 text-green-600 border-green-500'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', categoryId: '' })}
              className={`flex-1 py-3 rounded-lg font-medium border-2 ${
                formData.type === 'expense'
                  ? 'bg-red-50 text-red-600 border-red-500'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <Input
          label="Description"
          type="text"
          placeholder="What was this for?"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <Select
          label="Category"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        >
          <option value="">Select a category</option>
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
          max={new Date().toISOString().split('T')[0]}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading} className="flex-1">
            {isLoading ? 'Saving...' : transaction ? 'Update' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
