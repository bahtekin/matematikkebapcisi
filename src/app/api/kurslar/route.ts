import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const popular = searchParams.get('popular') === 'true'

    const kurslar = await prisma.kurs.findMany({
      include: {
        kategori: {
          select: {
            isim: true
          }
        },
        ogretmen: {
          select: {
            ad: true,
            soyad: true,
            resimUrl: true
          }
        },
        _count: {
          select: {
            dersler: true,
            kayitlar: true
          }
        }
      },
      orderBy: {
        olusturuldu: 'desc'
      },
      take: popular ? 6 : undefined
    })

    // Eğer popüler kurslar isteniyorsa, kayıt sayısına göre sırala
    if (popular) {
      kurslar.sort((a, b) => b._count.kayitlar - a._count.kayitlar)
    }

    return NextResponse.json(kurslar)
  } catch (error) {
    console.error('Kurslar getirilirken hata:', error)
    return NextResponse.json(
      { message: 'Kurslar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 