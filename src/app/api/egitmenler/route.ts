import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const egitmenler = await prisma.user.findMany({
      where: {
        rol: 'TEACHER'
      },
      include: {
        ogretmenKurslari: {
          select: {
            id: true,
            baslik: true,
            resimUrl: true,
          }
        }
      },
      orderBy: {
        olusturuldu: 'desc'
      }
    })

    const formattedEgitmenler = egitmenler.map(egitmen => ({
      ...egitmen,
      kurslar: egitmen.ogretmenKurslari
    }))

    return NextResponse.json(formattedEgitmenler)
  } catch (error) {
    console.error('Eğitmenler getirme hatası:', error)
    return NextResponse.json(
      { message: 'Eğitmenler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 