'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import type { SummaryData } from '@/types';

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/summary');
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionAdded = () => {
    fetchSummary();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Failed to load data</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your financial overview.</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="hidden sm:flex items-center gap-2"
        >
          <Plus size={20} />
          Add Transaction
        </Button>
      </div>

      <SummaryCards
        totalBalance={summaryData.totalBalance}
        monthlyIncome={summaryData.monthlyIncome}
        monthlyExpenses={summaryData.monthlyExpenses}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={summaryData.recentTransactions} />
        </div>
        <div>
          <CategoryBreakdown categories={summaryData.categoryBreakdown} />
        </div>
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 z-10"
      >
        <Plus size={24} />
      </button>

      <TransactionForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleTransactionAdded}
      />
    </>
  );
}
