import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request) {
  // const token = request.cookies.get('token')?.value;

  // const isPublicPath = ['/login', '/forgot-password'].includes(request.nextUrl.pathname);

  // if (!token && !isPublicPath) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  // if (token) {
  //   try {
  //     verify(token, process.env.JWT_SECRET);
  //   } catch {
  //     const url = request.nextUrl.clone();
  //     url.pathname = '/login';
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/((?!api|_next|favicon.ico).*)'],
// };