'use client'

import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface EgitmenListesiProps {
  egitmenler: any[]
}

export default function EgitmenListesi({ egitmenler }: EgitmenListesiProps) {
  const router = useRouter()

  const handleDelete = async (id: number) => {
    if (confirm('Bu eğitmeni silmek istediğinize emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/egitmenler?id=${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Silme işlemi başarısız oldu')
        }

        router.refresh()
      } catch (error) {
        console.error('Silme hatası:', error)
        alert('Eğitmen silinirken bir hata oluştu')
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Eğitmen</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">E-posta</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kurs Sayısı</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {egitmenler.map((egitmen) => (
            <tr key={egitmen.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {egitmen.resimUrl && (
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={egitmen.resimUrl}
                        alt={`${egitmen.ad} ${egitmen.soyad}`}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {egitmen.ad} {egitmen.soyad}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-gray-100">{egitmen.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-gray-100">{egitmen._count.ogretmenKurslari}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <Link
                    href={`/admin/egitmenler/duzenle/${egitmen.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <Pencil className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(egitmen.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 