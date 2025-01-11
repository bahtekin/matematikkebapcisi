import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyJwtToken } from '@/lib/jwt';

// Profil bilgilerini getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    if (!decoded || decoded.userId !== parseInt(params.id)) {
      return NextResponse.json(
        { message: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    // Kullanıcı bilgilerini getir
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        ad: true,
        soyad: true,
        email: true,
        telefon: true,
        resimUrl: true,
        biyografi: true,
        rol: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    return NextResponse.json(
      { message: 'Profil bilgileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Profil bilgilerini güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    if (!decoded || decoded.userId !== parseInt(params.id)) {
      return NextResponse.json(
        { message: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    const data = await request.json();

    // E-posta kontrolü
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: parseInt(params.id) },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: 'Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor' },
          { status: 400 }
        );
      }
    }

    // Kullanıcıyı güncelle
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        ad: data.ad,
        soyad: data.soyad,
        email: data.email,
        telefon: data.telefon,
        biyografi: data.biyografi,
        resimUrl: data.resimUrl,
      },
      select: {
        id: true,
        ad: true,
        soyad: true,
        email: true,
        telefon: true,
        resimUrl: true,
        biyografi: true,
        rol: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    return NextResponse.json(
      { message: 'Profil güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 