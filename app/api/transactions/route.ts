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
    const type = searchParams.get('type');
    const categoryId = searchParams.get('category_id');

    const where: any = {
      userId: currentUser.userId,
    };

    if (type && (type === 'income' || type === 'expense')) {
      where.type = type;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    } else if (year) {
      const startDate = new Date(parseInt(year), 0, 1);
      const endDate = new Date(parseInt(year), 11, 31);
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, type, description, categoryId, date } = body;

    if (!amount || !type || !description || !date) {
      return NextResponse.json(
        { error: 'Amount, type, description, and date are required' },
        { status: 400 }
      );
    }

    if (type !== 'income' && type !== 'expense') {
      return NextResponse.json(
        { error: 'Type must be either income or expense' },
        { status: 400 }
      );
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { error: 'Amount must be a positive number' },
        { status: 400 }
      );
    }

    // Maximum amount validation (prevent absurdly large amounts)
    const MAX_AMOUNT = 9999999999.99; // As defined in schema: Decimal(12,2)
    if (amountNum > MAX_AMOUNT) {
      return NextResponse.json(
        { error: `Amount cannot exceed ${MAX_AMOUNT.toLocaleString()}` },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length > 255) {
      return NextResponse.json(
        { error: 'Description cannot exceed 255 characters' },
        { status: 400 }
      );
    }

    // Validate date
    const transactionDate = new Date(date);
    if (isNaN(transactionDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (transactionDate > new Date()) {
      return NextResponse.json(
        { error: 'Date cannot be in the future' },
        { status: 400 }
      );
    }

    // Prevent dates too far in the past (more than 100 years)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    if (transactionDate < minDate) {
      return NextResponse.json(
        { error: 'Date cannot be more than 100 years in the past' },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: currentUser.userId,
        amount: amountNum,
        type,
        description,
        categoryId: categoryId || null,
        date: transactionDate,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
