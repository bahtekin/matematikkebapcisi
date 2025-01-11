import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import KategoriListesi from './components/KategoriListesi'

const prisma = new PrismaClient()

async function getKategoriler() {
  const kategoriler = await prisma.kategori.findMany({
    include: {
      _count: {
        select: {
          kurslar: true
        }
      }
    },
    orderBy: {
      isim: 'asc'
    }
  })
  return kategoriler
}

export default async function KategorilerPage() {
  const kategoriler = await getKategoriler()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Kategoriler</h1>
        <Link
          href="/admin/kategoriler/ekle"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Kategori Ekle</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <KategoriListesi kategoriler={kategoriler} />
      </div>
    </div>
  )
} 