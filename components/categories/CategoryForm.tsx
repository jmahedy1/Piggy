'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Category } from '@/types';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  category?: Category | null;
}

const ICON_OPTIONS = ['💼', '💻', '📈', '💰', '🍔', '🚗', '💡', '🎬', '🛍️', '🏥', '💸', '🏠', '📱', '✈️', '🎓'];
const COLOR_OPTIONS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#64748b',
];

export function CategoryForm({ isOpen, onClose, onSubmit, category }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    icon: '📁',
    color: '#6366f1',
  });

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name,
          type: category.type,
          icon: category.icon || '📁',
          color: category.color || '#6366f1',
        });
      } else {
        setFormData({
          name: '',
          type: 'expense',
          icon: '📁',
          color: '#6366f1',
        });
      }
    }
  }, [isOpen, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = category ? `/api/categories/${category.id}` : '/api/categories';
      const method = category ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save category');
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'Add Category'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Category Name"
          type="text"
          placeholder="Enter category name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
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
              onClick={() => setFormData({ ...formData, type: 'expense' })}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
          <div className="grid grid-cols-6 gap-2">
            {ICON_OPTIONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`p-3 text-2xl border-2 rounded-lg hover:border-gray-300 ${
                  formData.icon === icon ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <div className="grid grid-cols-9 gap-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color ? 'border-gray-900' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading} className="flex-1">
            {isLoading ? 'Saving...' : category ? 'Update' : 'Add Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
