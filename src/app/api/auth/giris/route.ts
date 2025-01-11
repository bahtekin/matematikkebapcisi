import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, sifre } = await request.json()

    // Kullanıcıyı e-posta ile bul
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'E-posta veya şifre hatalı' },
        { status: 401 }
      )
    }

    // Şifre kontrolü
    const sifreEslesti = await bcrypt.compare(sifre, user.sifre)
    if (!sifreEslesti) {
      return NextResponse.json(
        { message: 'E-posta veya şifre hatalı' },
        { status: 401 }
      )
    }

    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        rol: user.rol
      },
      process.env.JWT_SECRET || 'gizli-anahtar',
      { expiresIn: '7d' }
    )

    // Kullanıcı bilgilerini döndür
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        ad: user.ad,
        soyad: user.soyad,
        rol: user.rol,
      },
      token
    })
  } catch (error) {
    console.error('Giriş hatası:', error)
    return NextResponse.json(
      { message: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    )
  }
} 