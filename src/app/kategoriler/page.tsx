import Link from 'next/link'

interface Kategori {
  id: number
  isim: string
  aciklama: string | null
  _count: {
    kurslar: number
  }
}

async function getKategoriler(): Promise<Kategori[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/kategoriler`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Kategoriler yüklenirken bir hata oluştu')
    }

    return res.json()
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error)
    return []
  }
}

export default async function KategorilerPage() {
  const kategoriler = await getKategoriler()

  if (!kategoriler.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Kurs Kategorileri</h1>
        <p className="text-gray-600 dark:text-gray-300">Henüz kategori bulunmamaktadır.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kurs Kategorileri</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kategoriler.map((kategori: Kategori) => (
          <Link key={kategori.id} href={`/kurslar?kategori=${kategori.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{kategori.isim}</h2>
              {kategori.aciklama && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {kategori.aciklama}
                </p>
              )}
              <div className="text-sm text-blue-600 dark:text-blue-400">
                {kategori._count.kurslar} Kurs
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 