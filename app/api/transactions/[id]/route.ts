import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: currentUser.userId,
      },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { amount, type, description, categoryId, date } = body;

    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: currentUser.userId,
      },
    });

    if (!existingTransaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (amount !== undefined) {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        return NextResponse.json(
          { error: 'Amount must be a positive number' },
          { status: 400 }
        );
      }

      const MAX_AMOUNT = 9999999999.99;
      if (amountNum > MAX_AMOUNT) {
        return NextResponse.json(
          { error: `Amount cannot exceed ${MAX_AMOUNT.toLocaleString()}` },
          { status: 400 }
        );
      }

      updateData.amount = amountNum;
    }

    if (type !== undefined) {
      if (type !== 'income' && type !== 'expense') {
        return NextResponse.json(
          { error: 'Type must be either income or expense' },
          { status: 400 }
        );
      }
      updateData.type = type;
    }

    if (description !== undefined) {
      if (description.length > 255) {
        return NextResponse.json(
          { error: 'Description cannot exceed 255 characters' },
          { status: 400 }
        );
      }
      updateData.description = description;
    }

    if (categoryId !== undefined) {
      updateData.categoryId = categoryId || null;
    }

    if (date !== undefined) {
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

      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      if (transactionDate < minDate) {
        return NextResponse.json(
          { error: 'Date cannot be more than 100 years in the past' },
          { status: 400 }
        );
      }

      updateData.date = transactionDate;
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('Update transaction error:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: currentUser.userId,
      },
    });

    if (!existingTransaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete transaction error:', error);
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
