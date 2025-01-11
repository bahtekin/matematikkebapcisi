import { PrismaClient } from '@prisma/client'
import EgitmenForm from '../../components/EgitmenForm'

const prisma = new PrismaClient()

type Props = {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EgitmenDuzenlePage({ params }: Props) {
  const egitmen = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
    select: {
      id: true,
      ad: true,
      soyad: true,
      email: true,
      resimUrl: true,
      biyografi: true,
    }
  })

  if (!egitmen) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg">
          Eğitmen bulunamadı
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Eğitmen Düzenle</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <EgitmenForm initialData={egitmen} />
      </div>
    </div>
  )
} 