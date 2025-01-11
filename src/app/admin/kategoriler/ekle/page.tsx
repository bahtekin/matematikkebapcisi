import KategoriForm from '../components/KategoriForm'

export default function KategoriEklePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Yeni Kategori Ekle</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <KategoriForm initialData={null} />
      </div>
    </div>
  )
} 