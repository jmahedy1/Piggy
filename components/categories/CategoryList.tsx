'use client';

import { Edit2, Trash2 } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
  title: string;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, title, onEdit, onDelete }: CategoryListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No categories yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon || '📁'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{category.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          'Are you sure you want to delete this category? Transactions will not be deleted but will become uncategorized.'
                        )
                      ) {
                        onDelete(category.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
