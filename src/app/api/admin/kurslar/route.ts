import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createSlug } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Slug oluştur
    let slug = createSlug(data.baslik)
    
    // Eğer aynı slug varsa sonuna sayı ekle
    let slugExists = true
    let counter = 0
    let finalSlug = slug
    
    while (slugExists) {
      const existingCourse = await prisma.kurs.findFirst({
        where: { 
          slug: finalSlug
        }
      })
      
      if (!existingCourse) {
        slugExists = false
      } else {
        counter++
        finalSlug = `${slug}-${counter}`
      }
    }
    
    const kurs = await prisma.kurs.create({
      data: {
        baslik: data.baslik,
        slug: finalSlug,
        aciklama: data.aciklama,
        fiyat: parseFloat(data.fiyat),
        resimUrl: data.resimUrl || null,
        tag: data.tag || null,
        duration: data.duration || null,
        rating: parseFloat(data.rating || '5.0'),
        kategoriId: parseInt(data.kategoriId),
        ogretmenId: parseInt(data.ogretmenId),
        whatYouWillLearn: data.whatYouWillLearn || [],
        requirements: data.requirements || [],
        curriculum: data.curriculum || [],
        videoUrl: data.videoUrl || null,
        kaynaklar: data.kaynaklar || []
      }
    })

    return NextResponse.json(kurs)
  } catch (error: any) {
    console.error('Kurs oluşturma hatası:', error)
    return NextResponse.json(
      { message: 'Kurs oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    // Slug oluştur
    let slug = createSlug(data.baslik)
    
    // Eğer aynı slug varsa ve bu kursun kendisi değilse sonuna sayı ekle
    let slugExists = true
    let counter = 0
    let finalSlug = slug
    
    while (slugExists) {
      const existingCourse = await prisma.kurs.findFirst({
        where: { 
          AND: [
            { slug: finalSlug },
            { NOT: { id: parseInt(data.id) } }
          ]
        }
      })
      
      if (!existingCourse) {
        slugExists = false
      } else {
        counter++
        finalSlug = `${slug}-${counter}`
      }
    }
    
    const kurs = await prisma.kurs.update({
      where: { id: parseInt(data.id) },
      data: {
        baslik: data.baslik,
        slug: finalSlug,
        aciklama: data.aciklama,
        fiyat: parseFloat(data.fiyat),
        resimUrl: data.resimUrl || null,
        tag: data.tag || null,
        duration: data.duration || null,
        rating: parseFloat(data.rating || '5.0'),
        kategoriId: parseInt(data.kategoriId),
        ogretmenId: parseInt(data.ogretmenId),
        whatYouWillLearn: data.whatYouWillLearn || [],
        requirements: data.requirements || [],
        curriculum: data.curriculum || [],
        videoUrl: data.videoUrl || null,
        kaynaklar: data.kaynaklar || []
      }
    })

    return NextResponse.json(kurs)
  } catch (error: any) {
    console.error('Kurs güncelleme hatası:', error)
    return NextResponse.json(
      { message: 'Kurs güncellenirken bir hata oluştu' },
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

    await prisma.kurs.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Kurs silme hatası:', error)
    return NextResponse.json(
      { message: 'Kurs silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 