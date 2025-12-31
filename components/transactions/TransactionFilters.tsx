'use client';

import { Calendar, Filter, PieChart } from 'lucide-react';
import type { Category } from '@/types';

interface TransactionFiltersProps {
  filters: {
    month: string;
    year: string;
    type: string;
    categoryId: string;
  };
  categories: Category[];
  onFilterChange: (key: string, value: string) => void;
}

export function TransactionFilters({ filters, categories, onFilterChange }: TransactionFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
          <Calendar size={18} className="text-gray-400" />
          <select
            value={`${filters.year}-${filters.month || '00'}`}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              onFilterChange('year', year);
              onFilterChange('month', month === '00' ? '' : month);
            }}
            className="bg-transparent outline-none text-gray-700"
          >
            <option value={`${currentYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}>
              This Month
            </option>
            <option value={`${currentYear}-${String(new Date().getMonth()).padStart(2, '0')}`}>
              Last Month
            </option>
            <option value={`${currentYear}-00`}>This Year</option>
            {years.map((year) => (
              <option key={year} value={`${year}-00`}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
          <Filter size={18} className="text-gray-400" />
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="bg-transparent outline-none text-gray-700"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
          <PieChart size={18} className="text-gray-400" />
          <select
            value={filters.categoryId}
            onChange={(e) => onFilterChange('categoryId', e.target.value)}
            className="bg-transparent outline-none text-gray-700"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
