import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, verifyPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Disable 2FA for the user
 * Requires password confirmation for security
 */
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required to disable 2FA' },
        { status: 400 }
      );
    }

    // Get user with password hash
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: {
        passwordHash: true,
        twoFactorEnabled: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is not enabled' },
        { status: 400 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Disable 2FA and remove secret
    await prisma.user.update({
      where: { id: currentUser.userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    });

    return NextResponse.json({
      message: '2FA has been disabled',
      success: true,
    });
  } catch (error) {
    console.error('2FA disable error:', error);
    return NextResponse.json(
      { error: 'Failed to disable 2FA' },
      { status: 500 }
    );
  }
}
