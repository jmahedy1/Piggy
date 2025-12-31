import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  try {
    await resend.emails.send({
      from: 'Piggy <onboarding@resend.dev>', // Change this when you verify your domain
      to: email,
      subject: 'Reset Your Piggy Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Piggy</h1>
            </div>

            <div style="background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1e293b; margin-top: 0;">Reset Your Password</h2>

              <p style="color: #64748b; font-size: 16px;">
                You recently requested to reset your password for your Piggy account. Click the button below to reset it.
              </p>

              <div style="text-align: center; margin: 35px 0;">
                <a href="${resetUrl}"
                   style="background: #6366f1; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">
                  Reset Password
                </a>
              </div>

              <p style="color: #64748b; font-size: 14px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="color: #6366f1; font-size: 14px; word-break: break-all;">
                ${resetUrl}
              </p>

              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 13px; margin: 5px 0;">
                  This link will expire in 1 hour for security reasons.
                </p>
                <p style="color: #94a3b8; font-size: 13px; margin: 5px 0;">
                  If you didn't request a password reset, you can safely ignore this email.
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} Piggy. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}
