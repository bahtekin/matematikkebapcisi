import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const kategori = await prisma.kategori.create({
      data: {
        isim: data.isim,
        aciklama: data.aciklama || '',
      },
    })

    return NextResponse.json(kategori)
  } catch (error) {
    console.error('Kategori oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Kategori oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    const kategori = await prisma.kategori.update({
      where: { id: data.id },
      data: {
        isim: data.isim,
        aciklama: data.aciklama || '',
      },
    })

    return NextResponse.json(kategori)
  } catch (error) {
    console.error('Kategori güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Kategori güncellenirken bir hata oluştu' },
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
        { error: 'ID parametresi gerekli' },
        { status: 400 }
      )
    }

    await prisma.kategori.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Kategori silme hatası:', error)
    return NextResponse.json(
      { error: 'Kategori silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 