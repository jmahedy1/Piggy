import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/signup', '/forgot-password', '/reset-password'];
const authPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Simple check: if token exists, user is likely authenticated
  // Actual verification happens in API routes
  const hasToken = !!token;

  if (pathname === '/') {
    if (hasToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authPaths.includes(pathname) && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!publicPaths.includes(pathname) && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
};
