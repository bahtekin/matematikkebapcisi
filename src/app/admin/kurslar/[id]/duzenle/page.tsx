import prisma from '@/lib/prisma'
import KursForm from '../../components/KursForm'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

async function getFormData(id: string) {
  try {
    const [kurs, kategoriler, ogretmenler] = await Promise.all([
      prisma.kurs.findUnique({
        where: { id: parseInt(id) },
        include: {
          kategori: true,
          ogretmen: true
        }
      }),
      prisma.kategori.findMany({
        orderBy: { isim: 'asc' }
      }),
      prisma.user.findMany({
        where: { rol: 'TEACHER' },
        orderBy: { ad: 'asc' }
      })
    ])

    if (!kurs) {
      return notFound()
    }

    return { kurs, kategoriler, ogretmenler }
  } catch (error) {
    console.error('Kurs verisi getirme hatası:', error)
    throw error
  }
}

export default async function KursDuzenlePage({ params }: Props) {
  const { kurs, kategoriler, ogretmenler } = await getFormData(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Kurs Düzenle: {kurs.baslik}
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <KursForm 
          kategoriler={kategoriler}
          ogretmenler={ogretmenler}
          initialData={kurs}
        />
      </div>
    </div>
  )
} 