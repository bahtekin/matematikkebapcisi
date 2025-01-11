import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, sifre } = await req.json()

    // E-posta kontrolü
    const mevcutKullanici = await prisma.user.findUnique({
      where: { email }
    })

    if (mevcutKullanici) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılıyor.' },
        { status: 400 }
      )
    }

    // Şifreyi hashle
    const hashedSifre = await hash(sifre, 10)

    // Yeni admin oluştur
    const yeniAdmin = await prisma.user.create({
      data: {
        email,
        sifre: hashedSifre,
        rol: 'ADMIN',
        ad: 'Admin',
        soyad: 'Kullanıcı'
      }
    })

    // Hassas bilgileri çıkar
    const { sifre: _, ...guvenliAdmin } = yeniAdmin

    return NextResponse.json(guvenliAdmin)
  } catch (error) {
    console.error('Admin ekleme hatası:', error)
    return NextResponse.json(
      { error: 'Admin eklenirken bir hata oluştu.' },
      { status: 500 }
    )
  }
}

// Adminleri getir
export async function GET() {
  try {
    const adminler = await prisma.user.findMany({
      where: {
        rol: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        ad: true,
        soyad: true,
        olusturuldu: true
      }
    })

    return NextResponse.json(adminler)
  } catch (error) {
    console.error('Adminleri getirme hatası:', error)
    return NextResponse.json(
      { error: 'Adminler getirilirken bir hata oluştu.' },
      { status: 500 }
    )
  }
}

// Şifre değiştir
export async function PATCH(req: Request) {
  try {
    const { adminId, yeniSifre } = await req.json()

    // Şifreyi hashle
    const hashedSifre = await hash(yeniSifre, 10)

    // Şifreyi güncelle
    await prisma.user.update({
      where: { id: adminId },
      data: { sifre: hashedSifre }
    })

    return NextResponse.json({ message: 'Şifre başarıyla güncellendi.' })
  } catch (error) {
    console.error('Şifre değiştirme hatası:', error)
    return NextResponse.json(
      { error: 'Şifre değiştirilirken bir hata oluştu.' },
      { status: 500 }
    )
  }
}

// Admin sil
export async function DELETE(req: Request) {
  try {
    const { adminId } = await req.json()

    await prisma.user.delete({
      where: { id: adminId }
    })

    return NextResponse.json({ message: 'Admin başarıyla silindi.' })
  } catch (error) {
    console.error('Admin silme hatası:', error)
    return NextResponse.json(
      { error: 'Admin silinirken bir hata oluştu.' },
      { status: 500 }
    )
  }
} 