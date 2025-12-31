import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (for production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export function rateLimit(options: RateLimitOptions) {
  const { maxRequests, windowMs } = options;

  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Get client identifier (IP address or fallback)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';

    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();

    const entry = rateLimitStore.get(key);

    if (!entry || entry.resetTime < now) {
      // Create new entry
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return null; // Allow request
    }

    if (entry.count >= maxRequests) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
          }
        }
      );
    }

    // Increment count
    entry.count++;
    return null; // Allow request
  };
}

// Preset rate limiters for common use cases
export const loginRateLimit = rateLimit({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export const registerRateLimit = rateLimit({
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
});

export const forgotPasswordRateLimit = rateLimit({
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
});

export const apiRateLimit = rateLimit({
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
});
