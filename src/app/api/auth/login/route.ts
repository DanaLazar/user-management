import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { SignJWT } from 'jose';

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  // Check credentials
  if (email !== 'admin@ad.ro' || password !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Ensure secret is loaded correctly
  const secret = process.env.AUTH_SECRET || '';
  if (!secret) {
    console.error('AUTH_SECRET is not defined');
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

  // Sign JWT
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(secret));

  // Serialize cookie
  const serialized = serialize('currentUser', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  // Return response with cookie
  return new Response(JSON.stringify({ message: 'Authenticated' }), {
    status: 200,
    headers: { 'Set-Cookie': serialized },
  });
}
