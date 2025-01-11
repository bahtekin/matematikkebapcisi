import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function middleware(request: NextRequest) {
  // Admin giriş sayfasına erişime izin ver
  if (request.nextUrl.pathname === '/admin/giris') {
    // Eğer zaten giriş yapmışsa admin paneline yönlendir
    const token = request.cookies.get('admin_token')?.value
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secretKey)
        if (payload.rol === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      } catch (error) {
        // Token geçersizse devam et
      }
    }
    return NextResponse.next()
  }

  // Admin paneli sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/giris', request.url))
    }

    try {
      // Token'ı doğrula
      const { payload } = await jwtVerify(token, secretKey)

      // Admin rolünü kontrol et
      if (payload.rol !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/giris', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      // Token geçersizse giriş sayfasına yönlendir
      return NextResponse.redirect(new URL('/admin/giris', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 