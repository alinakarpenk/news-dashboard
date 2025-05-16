import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request) {
  try {
    const token = request.cookies.get('authToken')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({
      authenticated: true,
      user: { id: payload.id },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
