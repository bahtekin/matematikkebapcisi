import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const kategoriler = await prisma.kategori.findMany({
      include: {
        _count: {
          select: {
            kurslar: true
          }
        }
      }
    })

    return NextResponse.json(kategoriler)
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kategoriler yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 