'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import type { Transaction, Category } from '@/types';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState({
    month: String(new Date().getMonth() + 1).padStart(2, '0'),
    year: String(new Date().getFullYear()),
    type: '',
    categoryId: '',
  });

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.month) params.append('month', filters.month);
      if (filters.year) params.append('year', filters.year);
      if (filters.type) params.append('type', filters.type);
      if (filters.categoryId) params.append('category_id', filters.categoryId);

      const response = await fetch(`/api/transactions?${params}`);
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  const handleTransactionSaved = () => {
    fetchTransactions();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500 mt-1">View and manage all your transactions</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="hidden sm:flex items-center gap-2"
        >
          <Plus size={20} />
          Add Transaction
        </Button>
      </div>

      <TransactionFilters
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <button
        onClick={() => setShowModal(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 z-10"
      >
        <Plus size={24} />
      </button>

      <TransactionForm
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleTransactionSaved}
        transaction={editingTransaction}
      />
    </>
  );
}
