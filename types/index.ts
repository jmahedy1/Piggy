import { TransactionType } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  icon?: string | null;
  color?: string | null;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId?: string | null;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  category?: Category | null;
}

export interface SummaryData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  recentTransactions: Transaction[];
  categoryBreakdown: {
    name: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
