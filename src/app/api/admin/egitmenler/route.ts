import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Varsayılan şifre kontrolü
    const sifre = data.sifre || '123456'
    const hashedSifre = await bcrypt.hash(sifre, 10)
    
    const egitmen = await prisma.user.create({
      data: {
        ad: data.ad,
        soyad: data.soyad,
        email: data.email,
        sifre: hashedSifre,
        rol: 'TEACHER',
        resimUrl: data.resimUrl,
        biyografi: data.biyografi,
      },
      select: {
        id: true,
        ad: true,
        soyad: true,
        email: true,
        rol: true,
        resimUrl: true,
        biyografi: true,
        olusturuldu: true,
        guncellendi: true,
      }
    })

    return NextResponse.json(egitmen)
  } catch (error: any) {
    console.error('Eğitmen oluşturma hatası:', error)
    
    // Özel hata mesajları
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanımda.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Eğitmen oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    const updateData: any = {
      ad: data.ad,
      soyad: data.soyad,
      email: data.email,
      resimUrl: data.resimUrl,
      biyografi: data.biyografi,
    }

    // Eğer yeni şifre varsa güncelle
    if (data.sifre) {
      updateData.sifre = await bcrypt.hash(data.sifre, 10)
    }
    
    const egitmen = await prisma.user.update({
      where: { id: data.id },
      data: updateData,
      select: {
        id: true,
        ad: true,
        soyad: true,
        email: true,
        rol: true,
        resimUrl: true,
        biyografi: true,
        olusturuldu: true,
        guncellendi: true,
      }
    })

    return NextResponse.json(egitmen)
  } catch (error: any) {
    console.error('Eğitmen güncelleme hatası:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanımda.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Eğitmen güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'ID parametresi gerekli' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Eğitmen silme hatası:', error)
    return NextResponse.json(
      { message: 'Eğitmen silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 