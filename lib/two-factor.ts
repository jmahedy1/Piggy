import { authenticator } from 'otplib';
import QRCode from 'qrcode';

// Configure TOTP settings
authenticator.options = {
  window: 1, // Allow 1 step before and after current time
};

/**
 * Generate a new 2FA secret for a user
 */
export function generateTwoFactorSecret(): string {
  return authenticator.generateSecret();
}

/**
 * Generate otpauth URL for QR code
 * @param email User's email address
 * @param secret The 2FA secret
 */
export function getTwoFactorAuthUrl(email: string, secret: string): string {
  const appName = 'Piggy';
  return authenticator.keyuri(email, appName, secret);
}

/**
 * Generate QR code as data URL
 * @param otpauthUrl The otpauth:// URL
 */
export async function generateQRCodeDataURL(otpauthUrl: string): Promise<string> {
  try {
    return await QRCode.toDataURL(otpauthUrl);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Verify a TOTP token
 * @param token The 6-digit code from user's authenticator app
 * @param secret The user's 2FA secret
 */
export function verifyTwoFactorToken(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    console.error('2FA verification error:', error);
    return false;
  }
}

/**
 * Generate backup codes (in case user loses access to authenticator)
 * @param count Number of backup codes to generate (default: 8)
 */
export function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    // Generate 8-character alphanumeric codes
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }
  return codes;
}
