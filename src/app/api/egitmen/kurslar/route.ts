import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwtToken } from '@/lib/jwt';

// Kurs listesini getir
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    const payload = await verifyJwtToken(token);
    if (!payload || payload.rol !== 'TEACHER') {
      return NextResponse.json(
        { message: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

    const kurslar = await prisma.kurs.findMany({
      where: {
        egitmenId: payload.id,
      },
      orderBy: {
        olusturmaTarihi: 'desc',
      },
    });

    return NextResponse.json(kurslar);
  } catch (error) {
    console.error('Kurs listesi getirme hatası:', error);
    return NextResponse.json(
      { message: 'Kurslar alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Yeni kurs ekle
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    const payload = await verifyJwtToken(token);
    if (!payload || payload.rol !== 'TEACHER') {
      return NextResponse.json(
        { message: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const { baslik, aciklama, fiyat, resimUrl } = data;

    // Zorunlu alanları kontrol et
    if (!baslik || !aciklama || fiyat === undefined) {
      return NextResponse.json(
        { message: 'Lütfen tüm zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    // Yeni kurs oluştur
    const yeniKurs = await prisma.kurs.create({
      data: {
        baslik,
        aciklama,
        fiyat,
        resimUrl,
        egitmenId: payload.id,
        olusturmaTarihi: new Date(),
        guncellenmeTarihi: new Date(),
      },
    });

    return NextResponse.json(yeniKurs);
  } catch (error) {
    console.error('Kurs ekleme hatası:', error);
    return NextResponse.json(
      { message: 'Kurs eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 