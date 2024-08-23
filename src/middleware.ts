import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { mockData } from './data/mock-data';

const publicRoutes = ['/signin'];
export const config = { matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)' };

interface Cookie {
  aud?: string | string[] | undefined;
  iat?: number | undefined;
  exp?: number | undefined;
}

type DecodedUser = Cookie | null;

const middleware = async (request: NextRequest) => {
  // const currentUser = request.cookies.get('currentUser')?.value;
  // let decodedUser: DecodedUser = null;

  // if (currentUser) {
  //   const secret = process.env.AUTH_SECRET || '';

  //   if (!secret) {
  //     throw new Error('AUTH_SECRET is not defined');
  //   }

  //   const { payload } = await jwtVerify(currentUser, new TextEncoder().encode(secret));
  //   decodedUser = payload;
  // }

  // const currentDate = Date.now() / 1000;

  // if (
  //   !publicRoutes.includes(request.nextUrl.pathname) &&
  //   (!decodedUser || (decodedUser.exp && currentDate > decodedUser.exp))
  // ) {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }
};

export default middleware;
