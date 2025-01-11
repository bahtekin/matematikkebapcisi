import prisma from '@/lib/prisma'

async function getStats() {
  try {
    const [userCount, courseCount, teacherCount] = await Promise.all([
      prisma.user.count({
        where: {
          rol: 'STUDENT'
        }
      }),
      prisma.kurs.count(),
      prisma.user.count({
        where: {
          rol: 'TEACHER'
        }
      })
    ])

    return {
      userCount: userCount || 0,
      courseCount: courseCount || 0,
      enrollmentCount: 0,
      teacherCount: teacherCount || 0,
    }
  } catch (error) {
    console.error('İstatistikler yüklenirken hata:', error)
    return {
      userCount: 0,
      courseCount: 0,
      enrollmentCount: 0,
      teacherCount: 0,
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Paneli</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Genel istatistikler ve yönetim araçları
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* İstatistik Kartları */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Toplam Öğrenci</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.userCount}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Toplam Kurs</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.courseCount}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Toplam Kayıt</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.enrollmentCount}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Toplam Eğitmen</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.teacherCount}</p>
        </div>
      </div>

      {/* Hızlı İşlemler */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            Yeni Kurs Ekle
          </button>
          <button className="p-4 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors">
            Yeni Kullanıcı Ekle
          </button>
          <button className="p-4 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
            Blog Yazısı Ekle
          </button>
        </div>
      </div>

      {/* Son İşlemler */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Son İşlemler</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">Henüz işlem bulunmuyor</p>
          </div>
        </div>
      </div>
    </div>
  )
} 