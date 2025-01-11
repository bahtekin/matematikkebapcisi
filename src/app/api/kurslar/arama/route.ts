import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Arama terimi gerekli' }, { status: 400 });
    }

    const kurslar = await prisma.kurs.findMany({
      where: {
        OR: [
          {
            baslik: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            aciklama: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            kategori: {
              isim: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        id: true,
        baslik: true,
        slug: true,
        kategori: {
          select: {
            isim: true,
          },
        },
      },
      orderBy: {
        kayitlar: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    return NextResponse.json(kurslar);
  } catch (error) {
    console.error('Arama hatası:', error);
    return NextResponse.json(
      { error: 'Arama yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 