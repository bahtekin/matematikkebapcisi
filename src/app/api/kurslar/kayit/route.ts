import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwtToken } from '@/lib/jwt';

export async function POST(request: Request) {
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

    const { kursId } = await request.json();

    // Kullanıcının bu kursa zaten kayıtlı olup olmadığını kontrol et
    const mevcutKayit = await prisma.kursKayit.findFirst({
      where: {
        userId: decoded.userId,
        kursId: kursId
      }
    });

    if (mevcutKayit) {
      return NextResponse.json(
        { message: 'Bu kursa zaten kayıtlısınız' },
        { status: 400 }
      );
    }

    // Yeni kayıt oluştur
    const kayit = await prisma.kursKayit.create({
      data: {
        userId: decoded.userId,
        kursId: kursId,
        durum: 'aktif'
      },
      include: {
        kurs: {
          include: {
            ogretmen: {
              select: {
                ad: true,
                soyad: true,
                resimUrl: true
              }
            },
            _count: {
              select: {
                dersler: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(kayit);
  } catch (error) {
    console.error('Kurs kaydı hatası:', error);
    return NextResponse.json(
      { message: 'Kurs kaydı yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 