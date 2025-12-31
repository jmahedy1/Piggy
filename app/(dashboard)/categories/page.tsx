'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CategoryList } from '@/components/categories/CategoryList';
import { CategoryForm } from '@/components/categories/CategoryForm';
import type { Category } from '@/types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleCategorySaved = () => {
    fetchCategories();
  };

  const incomeCategories = categories.filter((cat) => cat.type === 'income');
  const expenseCategories = categories.filter((cat) => cat.type === 'expense');

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your income and expense categories</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="hidden sm:flex items-center gap-2">
          <Plus size={20} />
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        <div className="space-y-6">
          <CategoryList
            categories={incomeCategories}
            title="Income Categories"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <CategoryList
            categories={expenseCategories}
            title="Expense Categories"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 z-10"
      >
        <Plus size={24} />
      </button>

      <CategoryForm
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleCategorySaved}
        category={editingCategory}
      />
    </>
  );
}
