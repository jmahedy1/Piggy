'use client';

import { TrendingUp, TrendingDown, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {tx.type === 'income' ? (
                        <TrendingUp size={14} className="text-green-600" />
                      ) : (
                        <TrendingDown size={14} className="text-red-500" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{tx.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tx.category?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{formatDate(tx.date)}</td>
                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(tx)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this transaction?')) {
                          onDelete(tx.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
