import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwtToken } from '@/lib/jwt';

export async function GET(request: Request) {
  try {
    // Token kontrolü
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    const decoded = await verifyJwtToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Geçersiz token' },
        { status: 401 }
      );
    }

    // Kullanıcının kayıtlı kurslarını getir
    const kayitliKurslar = await prisma.kursKayit.findMany({
      where: {
        userId: decoded.userId,
      },
      include: {
        kurs: {
          include: {
            ogretmen: {
              select: {
                ad: true,
                soyad: true,
                resimUrl: true
              },
            },
            _count: {
              select: {
                dersler: true,
              },
            },
          },
        },
      },
      orderBy: {
        olusturuldu: 'desc',
      },
    });

    return NextResponse.json(kayitliKurslar);
  } catch (error) {
    console.error('Kayıtlı kurslar getirme hatası:', error);
    return NextResponse.json(
      { message: 'Kayıtlı kurslar alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 