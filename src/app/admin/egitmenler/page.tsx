import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import EgitmenListesi from './components/EgitmenListesi'

const prisma = new PrismaClient()

async function getEgitmenler() {
  const egitmenler = await prisma.user.findMany({
    where: {
      rol: 'TEACHER'
    },
    include: {
      _count: {
        select: {
          ogretmenKurslari: true,
          blogYazilari: true
        }
      }
    },
    orderBy: {
      ad: 'asc'
    }
  })
  return egitmenler
}

export default async function EgitmenlerPage() {
  const egitmenler = await getEgitmenler()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Eğitmenler</h1>
        <Link
          href="/admin/egitmenler/ekle"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Eğitmen Ekle</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <EgitmenListesi egitmenler={egitmenler} />
      </div>
    </div>
  )
} 