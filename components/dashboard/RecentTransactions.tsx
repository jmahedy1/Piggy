import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Transaction } from '@/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
        <Link
          href="/transactions"
          className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
        >
          View All
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {transactions.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No transactions yet. Start by adding one!
          </div>
        ) : (
          transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {tx.type === 'income' ? (
                    <TrendingUp size={18} className="text-green-600" />
                  ) : (
                    <TrendingDown size={18} className="text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    {tx.category?.name || 'Uncategorized'} • {formatDate(tx.date)}
                  </p>
                </div>
              </div>
              <span
                className={`font-semibold ${
                  tx.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
