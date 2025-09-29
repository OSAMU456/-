import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const pathname = request.nextUrl.pathname;

  // If the pathname doesn't start with a locale, redirect to Chinese locale
  const pathnameIsMissingLocale = !pathname.startsWith('/zh') && 
    !pathname.startsWith('/ja') && 
    !pathname.startsWith('/en') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next');

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/zh${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};