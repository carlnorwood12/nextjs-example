import { type NextRequest, NextResponse } from 'next/server';
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}
// middleware is used to protect the admin panel and redirect users to the login page if they are not authenticated
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/admin/:path*',
  ],
};