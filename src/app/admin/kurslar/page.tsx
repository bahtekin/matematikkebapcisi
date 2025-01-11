import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import KursListesi from './components/KursListesi'

const prisma = new PrismaClient()

async function getKurslar() {
  const kurslar = await prisma.kurs.findMany({
    include: {
      kategori: true,
      ogretmen: true,
      dersler: true,
    },
    orderBy: {
      olusturuldu: 'desc'
    }
  })
  return kurslar
}

export default async function KurslarPage() {
  const kurslar = await getKurslar()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kurslar</h1>
        <Link
          href="/admin/kurslar/ekle"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Kurs Ekle</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <KursListesi kurslar={kurslar} />
      </div>
    </div>
  )
} 