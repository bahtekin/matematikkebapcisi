import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, grade, examType, password } = body;

    // E-posta kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      );
    }

    // İsmi ad ve soyad olarak ayırma
    const [ad, ...soyadParts] = name.split(' ');
    const soyad = soyadParts.join(' ');

    // Şifreyi hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // Öğrenciyi oluşturma
    const user = await prisma.user.create({
      data: {
        email,
        sifre: hashedPassword,
        ad,
        soyad,
        rol: 'STUDENT',
        telefon: phone,
        // Öğrenci bilgilerini JSON olarak saklayalım
        biyografi: JSON.stringify({
          grade,
          examType
        })
      },
    });

    return NextResponse.json(
      { message: 'Kayıt başarılı', user: { ...user, sifre: undefined } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { error: 'Kayıt sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: {
        rol: 'STUDENT'
      },
      select: {
        id: true,
        ad: true,
        soyad: true,
        email: true,
        telefon: true,
        biyografi: true,
        olusturuldu: true,
      }
    });
    
    return NextResponse.json(students);
  } catch (error) {
    console.error('Öğrenci listesi alınırken hata:', error);
    return NextResponse.json(
      { error: 'Öğrenciler alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, phone, grade, examType } = body;

    // İsmi ad ve soyad olarak ayırma
    const [ad, ...soyadParts] = name.split(' ');
    const soyad = soyadParts.join(' ');

    // E-posta kontrolü (kendi e-postası hariç)
    const existingUser = await prisma.user.findFirst({
      where: {
        AND: [
          { email },
          { id: { not: id } }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor' },
        { status: 400 }
      );
    }

    // Öğrenciyi güncelleme
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        ad,
        soyad,
        telefon: phone,
        biyografi: JSON.stringify({
          grade,
          examType
        })
      },
    });

    return NextResponse.json(
      { message: 'Öğrenci başarıyla güncellendi', user: { ...updatedUser, sifre: undefined } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Öğrenci güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 