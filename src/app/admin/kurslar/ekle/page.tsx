import { PrismaClient } from '@prisma/client'
import KursForm from '../components/KursForm'

const prisma = new PrismaClient()

async function getFormData() {
  const [kategoriler, ogretmenler] = await Promise.all([
    prisma.kategori.findMany({
      orderBy: { isim: 'asc' }
    }),
    prisma.user.findMany({
      where: { rol: 'TEACHER' },
      orderBy: { ad: 'asc' }
    })
  ])

  return { kategoriler, ogretmenler }
}

export default async function KursEklePage() {
  const { kategoriler, ogretmenler } = await getFormData()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Yeni Kurs Ekle</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <KursForm 
          kategoriler={kategoriler}
          ogretmenler={ogretmenler}
          initialData={null}
        />
      </div>
    </div>
  )
} 