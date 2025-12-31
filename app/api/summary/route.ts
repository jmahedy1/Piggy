import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const now = new Date();
    const currentMonth = month ? parseInt(month) : now.getMonth() + 1;
    const currentYear = year ? parseInt(year) : now.getFullYear();

    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0);

    const allTransactions = await prisma.transaction.findMany({
      where: {
        userId: currentUser.userId,
      },
    });

    const totalIncome = allTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

    const totalExpenses = allTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

    const totalBalance = totalIncome - totalExpenses;

    const monthlyTransactions = await prisma.transaction.findMany({
      where: {
        userId: currentUser.userId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

    const recentTransactions = await prisma.transaction.findMany({
      where: {
        userId: currentUser.userId,
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: 10,
    });

    const monthlyExpenseTransactions = await prisma.transaction.findMany({
      where: {
        userId: currentUser.userId,
        type: 'expense',
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      include: {
        category: true,
      },
    });

    const categoryMap = new Map<string, { name: string; amount: number; color: string }>();

    monthlyExpenseTransactions.forEach((transaction) => {
      const categoryName = transaction.category?.name || 'Uncategorized';
      const categoryColor = transaction.category?.color || '#64748b';
      const amount = parseFloat(transaction.amount.toString());

      if (categoryMap.has(categoryName)) {
        const existing = categoryMap.get(categoryName)!;
        existing.amount += amount;
      } else {
        categoryMap.set(categoryName, {
          name: categoryName,
          amount,
          color: categoryColor,
        });
      }
    });

    const categoryBreakdownArray = Array.from(categoryMap.values());
    const totalCategoryAmount = categoryBreakdownArray.reduce((sum, cat) => sum + cat.amount, 0);

    const categoryBreakdown = categoryBreakdownArray
      .map((cat) => ({
        name: cat.name,
        amount: cat.amount,
        percentage: totalCategoryAmount > 0 ? Math.round((cat.amount / totalCategoryAmount) * 100) : 0,
        color: cat.color,
      }))
      .sort((a, b) => b.amount - a.amount);

    return NextResponse.json({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      recentTransactions,
      categoryBreakdown,
    });
  } catch (error) {
    console.error('Get summary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}
