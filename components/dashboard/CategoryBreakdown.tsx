import { formatCurrency } from '@/lib/utils';

interface CategoryBreakdownProps {
  categories: {
    name: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Spending by Category</h2>
      </div>
      <div className="p-6 space-y-4">
        {categories.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No expenses this month
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                <span className="text-sm text-gray-500">{formatCurrency(cat.amount)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
