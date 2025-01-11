import { PrismaClient } from '@prisma/client';
import EgitmenForm from '../../components/EgitmenForm';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface EgitmenDuzenlePageProps {
  params: {
    id: string;
  };
}

export default async function EgitmenDuzenlePage({
  params,
}: EgitmenDuzenlePageProps) {
  const egitmenId = parseInt(params.id, 10);

  if (isNaN(egitmenId)) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg">
          Geçersiz Eğitmen ID
        </div>
      </div>
    );
  }

  const egitmen = await prisma.user.findUnique({
    where: { id: egitmenId },
    select: {
      id: true,
      ad: true,
      soyad: true,
      email: true,
      resimUrl: true,
      biyografi: true,
    },
  });

  if (!egitmen) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Eğitmen Düzenle
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <EgitmenForm initialData={egitmen} />
      </div>
    </div>
  );
}