import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  generateTwoFactorSecret,
  getTwoFactorAuthUrl,
  generateQRCodeDataURL,
} from '@/lib/two-factor';

/**
 * Generate 2FA secret and QR code for user
 * User must verify a token to actually enable 2FA (see enable endpoint)
 */
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user already has 2FA enabled
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: { email: true, twoFactorEnabled: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is already enabled. Disable it first to set up again.' },
        { status: 400 }
      );
    }

    // Generate new secret
    const secret = generateTwoFactorSecret();

    // Generate otpauth URL
    const otpauthUrl = getTwoFactorAuthUrl(user.email, secret);

    // Generate QR code
    const qrCodeDataURL = await generateQRCodeDataURL(otpauthUrl);

    // Store the secret temporarily (not enabled yet)
    // User must verify a token to enable 2FA
    await prisma.user.update({
      where: { id: currentUser.userId },
      data: { twoFactorSecret: secret },
    });

    return NextResponse.json({
      secret,
      qrCode: qrCodeDataURL,
      message: 'Scan this QR code with your authenticator app, then verify a code to enable 2FA',
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup 2FA' },
      { status: 500 }
    );
  }
}
