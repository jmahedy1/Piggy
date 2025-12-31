import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';

const DEFAULT_CATEGORIES = {
  income: [
    { name: 'Salary', icon: '💼', color: '#10b981' },
    { name: 'Freelance', icon: '💻', color: '#3b82f6' },
    { name: 'Investments', icon: '📈', color: '#8b5cf6' },
    { name: 'Other Income', icon: '💰', color: '#f59e0b' },
  ],
  expense: [
    { name: 'Food & Dining', icon: '🍔', color: '#ef4444' },
    { name: 'Transportation', icon: '🚗', color: '#f97316' },
    { name: 'Utilities', icon: '💡', color: '#eab308' },
    { name: 'Entertainment', icon: '🎬', color: '#ec4899' },
    { name: 'Shopping', icon: '🛍️', color: '#a855f7' },
    { name: 'Healthcare', icon: '🏥', color: '#06b6d4' },
    { name: 'Other Expense', icon: '💸', color: '#64748b' },
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, password, first name, and last name are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName,
        lastName,
      },
    });

    await prisma.category.createMany({
      data: [
        ...DEFAULT_CATEGORIES.income.map((cat) => ({
          userId: user.id,
          name: cat.name,
          type: 'income' as const,
          icon: cat.icon,
          color: cat.color,
        })),
        ...DEFAULT_CATEGORIES.expense.map((cat) => ({
          userId: user.id,
          name: cat.name,
          type: 'expense' as const,
          icon: cat.icon,
          color: cat.color,
        })),
      ],
    });

    const token = generateToken(user.id);
    await setAuthCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
