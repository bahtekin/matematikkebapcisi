import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Token kontrolü (opsiyonel)
    const token = request.headers.get('authorization')?.split(' ')[1];
    let userId = null;
    
    if (token) {
      const decoded = await verifyJwtToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    const kurs = await prisma.kurs.findUnique({
      where: { slug: params.slug },
      include: {
        kategori: {
          select: {
            id: true,
            isim: true,
          },
        },
        ogretmen: {
          select: {
            ad: true,
            soyad: true,
            biyografi: true,
            resimUrl: true,
          },
        },
        dersler: {
          select: {
            id: true,
            baslik: true,
            sure: true,
          },
        },
        _count: {
          select: {
            kayitlar: true,
            dersler: true,
          },
        },
      },
    })

    if (!kurs) {
      return NextResponse.json(
        { message: 'Kurs bulunamadı' },
        { status: 404 }
      )
    }

    // Eğer kullanıcı giriş yapmışsa, kursa kayıtlı olup olmadığını kontrol et
    let kayitliMi = false;
    if (userId) {
      const kayit = await prisma.kursKayit.findFirst({
        where: {
          userId: userId,
          kursId: kurs.id,
        },
      });
      kayitliMi = !!kayit;
    }

    return NextResponse.json({
      ...kurs,
      kayitliMi,
    })
  } catch (error) {
    console.error('Kurs detay hatası:', error)
    return NextResponse.json(
      { message: 'Kurs bilgileri alınırken bir hata oluştu' },
      { status: 500 }
    )
  }
} 