import Link from 'next/link'

export default function AdminNotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404 - Sayfa Bulunamadı
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Aradığınız sayfa admin panelinde mevcut değil.
      </p>
      <Link
        href="/admin"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Admin Paneline Dön
      </Link>
    </div>
  )
} 