import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, sifre, ad, soyad } = body

    // Email ve şifre kontrolü
    if (!email || !sifre) {
      return NextResponse.json(
        { error: 'Email ve şifre zorunludur' },
        { status: 400 }
      )
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      )
    }

    // Email kullanımda mı kontrolü
    const mevcutKullanici = await prisma.user.findUnique({
      where: { email }
    })

    if (mevcutKullanici) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanımda' },
        { status: 400 }
      )
    }

    // Şifreyi hashle
    const hashedSifre = await bcrypt.hash(sifre, 10)

    // Yeni admin oluştur
    const yeniAdmin = await prisma.user.create({
      data: {
        email,
        sifre: hashedSifre,
        ad: ad || '',
        soyad: soyad || '',
        rol: 'ADMIN'
      }
    })

    // Hassas bilgileri çıkar
    const { sifre: _, ...adminBilgileri } = yeniAdmin

    return NextResponse.json(adminBilgileri)
  } catch (error) {
    console.error('Admin kayıt hatası:', error)
    return NextResponse.json(
      { error: 'Admin kaydı sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
} 