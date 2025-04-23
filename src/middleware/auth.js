import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

dotenv.config()
export function middleware(request) {
    const token = request.cookies.get('authToken')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY)
      return NextResponse.next()
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
    export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'],
  }