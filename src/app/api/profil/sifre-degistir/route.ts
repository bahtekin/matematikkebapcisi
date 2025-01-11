import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
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

    const { mevcutSifre, yeniSifre } = await request.json();

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        sifre: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Mevcut şifreyi kontrol et
    const sifreEslesti = await bcrypt.compare(mevcutSifre, user.sifre);
    if (!sifreEslesti) {
      return NextResponse.json(
        { message: 'Mevcut şifre hatalı' },
        { status: 400 }
      );
    }

    // Yeni şifreyi hashle
    const hashedSifre = await bcrypt.hash(yeniSifre, 10);

    // Şifreyi güncelle
    await prisma.user.update({
      where: { id: user.id },
      data: { sifre: hashedSifre },
    });

    return NextResponse.json({ message: 'Şifre başarıyla güncellendi' });
  } catch (error) {
    console.error('Şifre değiştirme hatası:', error);
    return NextResponse.json(
      { message: 'Şifre değiştirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 