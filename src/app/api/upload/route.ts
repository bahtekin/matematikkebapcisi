import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { verifyJwtToken } from '@/lib/jwt';

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
    if (!payload) {
      return NextResponse.json(
        { message: 'Geçersiz token' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'Resim dosyası gerekli' },
        { status: 400 }
      );
    }

    // Dosya tipini kontrol et
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Sadece resim dosyaları yüklenebilir' },
        { status: 400 }
      );
    }

    // Dosya boyutunu kontrol et (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Resim dosyası 5MB\'dan büyük olamaz' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dosya adını oluştur
    const fileName = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', fileName);

    // Dosyayı kaydet
    await writeFile(path, buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    console.error('Resim yükleme hatası:', error);
    return NextResponse.json(
      { message: 'Resim yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 