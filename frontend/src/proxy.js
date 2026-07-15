import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('adminSession');

  const isLoginPage = pathname === '/admin/login';

  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(
      new URL('/admin/login', request.url)
    );
  }

  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(
      new URL('/admin/view', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};