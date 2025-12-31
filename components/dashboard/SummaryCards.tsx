import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SummaryCardsProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function SummaryCards({ totalBalance, monthlyIncome, monthlyExpenses }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Balance</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatCurrency(totalBalance)}
            </p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <DollarSign size={24} className="text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Monthly Income</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatCurrency(monthlyIncome)}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <TrendingUp size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Monthly Expenses</p>
            <p className="text-3xl font-bold text-red-500 mt-2">
              {formatCurrency(monthlyExpenses)}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <TrendingDown size={24} className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
