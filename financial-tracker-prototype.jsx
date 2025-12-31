import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, Plus, Edit2, Trash2, PieChart, Calendar, Filter, LogOut, Menu, X, ChevronDown, Home, List, Settings, User } from 'lucide-react';

// Color scheme
const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  success: '#10b981',
  danger: '#ef4444',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
  textMuted: '#64748b',
  border: '#e2e8f0',
};

export default function FinancialTrackerPrototype() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample data
  const transactions = [
    { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'Salary', date: '2025-01-15' },
    { id: 2, description: 'Grocery Store', amount: 156.32, type: 'expense', category: 'Food', date: '2025-01-14' },
    { id: 3, description: 'Electric Bill', amount: 89.50, type: 'expense', category: 'Utilities', date: '2025-01-13' },
    { id: 4, description: 'Freelance Project', amount: 750, type: 'income', category: 'Freelance', date: '2025-01-12' },
    { id: 5, description: 'Restaurant', amount: 45.80, type: 'expense', category: 'Food', date: '2025-01-11' },
    { id: 6, description: 'Gas Station', amount: 52.00, type: 'expense', category: 'Transport', date: '2025-01-10' },
    { id: 7, description: 'Netflix', amount: 15.99, type: 'expense', category: 'Entertainment', date: '2025-01-09' },
    { id: 8, description: 'Investment Dividend', amount: 125.00, type: 'income', category: 'Investments', date: '2025-01-08' },
  ];

  const summaryData = {
    totalBalance: 12458.39,
    monthlyIncome: 5875.00,
    monthlyExpenses: 1842.61,
  };

  const categoryBreakdown = [
    { name: 'Food', amount: 202.12, percentage: 35, color: '#f59e0b' },
    { name: 'Utilities', amount: 89.50, percentage: 15, color: '#3b82f6' },
    { name: 'Transport', amount: 52.00, percentage: 9, color: '#10b981' },
    { name: 'Entertainment', amount: 15.99, percentage: 3, color: '#8b5cf6' },
  ];

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign size={32} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">Forgot password?</a>
          </div>
          
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Sign In
          </button>
          
          <p className="text-center text-gray-500">
            Don't have an account?{' '}
            <button onClick={() => setCurrentPage('signup')} className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Signup Page
  const SignupPage = () => (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign size={32} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Start tracking your finances today</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Create Account
          </button>
          
          <p className="text-center text-gray-500">
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Navigation Sidebar
  const Sidebar = () => (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <DollarSign size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">FinTrack</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            currentPage === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Home size={20} />
          <span className="font-medium">Dashboard</span>
        </button>
        
        <button
          onClick={() => setCurrentPage('transactions')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            currentPage === 'transactions' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <List size={20} />
          <span className="font-medium">Transactions</span>
        </button>
        
        <button
          onClick={() => setCurrentPage('categories')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            currentPage === 'categories' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <PieChart size={20} />
          <span className="font-medium">Categories</span>
        </button>
        
        <button
          onClick={() => setCurrentPage('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            currentPage === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </nav>
      
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage('login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );

  // Mobile Header
  const MobileHeader = () => (
    <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <DollarSign size={18} className="text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">FinTrack</span>
      </div>
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 p-4">
          <nav className="space-y-2">
            <button onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50">Dashboard</button>
            <button onClick={() => { setCurrentPage('transactions'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50">Transactions</button>
            <button onClick={() => { setCurrentPage('categories'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50">Categories</button>
            <button onClick={() => { setCurrentPage('settings'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50">Settings</button>
            <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-red-600">Sign Out</button>
          </nav>
        </div>
      )}
    </header>
  );

  // Add Transaction Modal
  const AddTransactionModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Transaction</h2>
          <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-green-50 text-green-600 border-2 border-green-500 rounded-lg font-medium">Income</button>
              <button className="flex-1 py-3 bg-gray-50 text-gray-600 border-2 border-gray-200 rounded-lg font-medium hover:border-gray-300">Expense</button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              placeholder="What was this for?"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white">
              <option>Select a category</option>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Utilities</option>
              <option>Entertainment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Page
  const DashboardPage = () => (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <MobileHeader />
        <main className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome back! Here's your financial overview.</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Balance</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">${summaryData.totalBalance.toLocaleString()}</p>
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
                  <p className="text-3xl font-bold text-green-600 mt-2">${summaryData.monthlyIncome.toLocaleString()}</p>
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
                  <p className="text-3xl font-bold text-red-500 mt-2">${summaryData.monthlyExpenses.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown size={24} className="text-red-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
                <button onClick={() => setCurrentPage('transactions')} className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</button>
              </div>
              <div className="divide-y divide-gray-50">
                {transactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {tx.type === 'income' ? <TrendingUp size={18} className="text-green-600" /> : <TrendingDown size={18} className="text-red-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.description}</p>
                        <p className="text-sm text-gray-500">{tx.category} • {tx.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Spending by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Spending by Category</h2>
              </div>
              <div className="p-6 space-y-4">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                      <span className="text-sm text-gray-500">${cat.amount.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile FAB */}
          <button
            onClick={() => setShowAddModal(true)}
            className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700"
          >
            <Plus size={24} />
          </button>
        </main>
      </div>
      {showAddModal && <AddTransactionModal />}
    </div>
  );

  // Transactions Page
  const TransactionsPage = () => (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <MobileHeader />
        <main className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-500 mt-1">View and manage all your transactions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
                <Calendar size={18} className="text-gray-400" />
                <select className="bg-transparent outline-none text-gray-700">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
                <Filter size={18} className="text-gray-400" />
                <select className="bg-transparent outline-none text-gray-700">
                  <option>All Types</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
                <PieChart size={18} className="text-gray-400" />
                <select className="bg-transparent outline-none text-gray-700">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Utilities</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Transactions List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Description</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Amount</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {tx.type === 'income' ? <TrendingUp size={14} className="text-green-600" /> : <TrendingDown size={14} className="text-red-500" />}
                          </div>
                          <span className="font-medium text-gray-900">{tx.description}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tx.category}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                      <td className={`px-6 py-4 text-right font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
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
          
          {/* Mobile FAB */}
          <button
            onClick={() => setShowAddModal(true)}
            className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700"
          >
            <Plus size={24} />
          </button>
        </main>
      </div>
      {showAddModal && <AddTransactionModal />}
    </div>
  );

  // Page Navigation
  const PageNav = () => (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-gray-200 px-2 py-2 flex gap-1 z-40">
      <button
        onClick={() => setCurrentPage('login')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'login' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Login
      </button>
      <button
        onClick={() => setCurrentPage('signup')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'signup' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Signup
      </button>
      <button
        onClick={() => setCurrentPage('dashboard')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setCurrentPage('transactions')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === 'transactions' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Transactions
      </button>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'transactions':
        return <TransactionsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="font-sans">
      {renderPage()}
      <PageNav />
    </div>
  );
}
