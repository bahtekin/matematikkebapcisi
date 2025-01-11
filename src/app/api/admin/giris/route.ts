import { NextResponse } from 'next/server'
import { compare } from 'bcrypt'
import prisma from '@/lib/prisma'
import { SignJWT } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function POST(req: Request) {
  try {
    const { email, sifre } = await req.json()

    // Kullanıcıyı bul
    const kullanici = await prisma.user.findUnique({
      where: { email }
    })

    if (!kullanici) {
      return NextResponse.json(
        { error: 'E-posta veya şifre hatalı.' },
        { status: 401 }
      )
    }

    // Admin kontrolü
    if (kullanici.rol !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Bu sayfaya erişim yetkiniz yok.' },
        { status: 403 }
      )
    }

    // Şifre kontrolü
    const sifreDogruMu = await compare(sifre, kullanici.sifre)

    if (!sifreDogruMu) {
      return NextResponse.json(
        { error: 'E-posta veya şifre hatalı.' },
        { status: 401 }
      )
    }

    // JWT token oluştur
    const token = await new SignJWT({
      id: kullanici.id,
      email: kullanici.email,
      rol: kullanici.rol
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secretKey)

    // Response oluştur
    const response = NextResponse.json({ success: true })

    // Cookie'yi ayarla
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 gün
    })

    return response
  } catch (error) {
    console.error('Giriş hatası:', error)
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu.' },
      { status: 500 }
    )
  }
} 