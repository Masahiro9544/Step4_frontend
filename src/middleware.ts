import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const publicPaths = ['/login', '/login/verify', '/auth/callback', '/_next', '/favicon.ico', '/api'];

    const isPublicPath = publicPaths.some(p => path.startsWith(p));

    if (!token && !isPublicPath) {
        // If not authenticated and trying to access a protected route, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && path === '/login') {
        // If authenticated and trying to access login, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
