import { NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Ayarlar getirilirken hata:', error);
    return NextResponse.json(
      { message: 'Ayarlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Yetkilendirme başarısız' },
        { status: 401 }
      );
    }

    const decodedToken = await verifyJwtToken(token);
    
    if (!decodedToken || decodedToken.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Mevcut ayarları kontrol et
    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      // Varsa güncelle
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          contactEmail: data.contactEmail,
          phoneNumber: data.phoneNumber,
          address: data.address,
          socialMedia: data.socialMedia,
          smtp: data.smtp
        },
      });
    } else {
      // Yoksa oluştur
      settings = await prisma.siteSettings.create({
        data: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          contactEmail: data.contactEmail,
          phoneNumber: data.phoneNumber,
          address: data.address,
          socialMedia: data.socialMedia,
          smtp: data.smtp
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Ayarlar kaydedilirken hata:', error);
    return NextResponse.json(
      { message: 'Ayarlar kaydedilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 